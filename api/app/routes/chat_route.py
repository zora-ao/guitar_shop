from sqlalchemy import or_, func
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.messages import Message
from ..models.user import User
from ..extensions import db
from uuid import UUID
from ..utils.auth_helpers import get_current_user_or_401

chat_bp = Blueprint('chat', __name__)

@chat_bp.route("/contacts", methods=['GET'])
@jwt_required()
def get_contacts_with_previews():
    current_user_id = UUID(get_jwt_identity())

    # This finds the last message ID for every conversation the user is part of
    last_message_subquery = db.session.query(
        func.max(Message.id).label("last_id")
    ).filter(
        or_(Message.sender_id == current_user_id, Message.receiver_id == current_user_id)
    ).group_by(
        # Group by the pair of users
        func.least(Message.sender_id, Message.receiver_id),
        func.greatest(Message.sender_id, Message.receiver_id)
    ).subquery()

    last_messages = Message.query.filter(Message.id.in_(last_message_subquery)).order_by(Message.created_at.desc()).all()

    results = []
    for msg in last_messages:
        # Determine which user in the message is the 'other' person
        other_user_id = msg.receiver_id if msg.sender_id == current_user_id else msg.sender_id
        other_user = User.query.get(other_user_id)

        if not other_user:
            continue

        results.append({
            "id": str(other_user.id),
            "username": other_user.username,
            "last_message": msg.content,
            "last_message_time": msg.created_at.isoformat()
        })

    return jsonify(results), 200

@chat_bp.route("/history/<string:other_user_id>", methods=['GET'])
@jwt_required()
def get_chat_history(other_user_id):
    current_user_id = UUID(get_jwt_identity())

    try:
        other_user_id = UUID(other_user_id)
    except (ValueError, AttributeError):
        return jsonify({"error": "Invalid user ID format"}), 400

    messages = Message.query.filter(
        ((Message.sender_id == current_user_id) & (Message.receiver_id == other_user_id)) |
        ((Message.sender_id == other_user_id) & (Message.receiver_id == current_user_id))
    ).order_by(Message.created_at.asc()).all()

    return jsonify([m.to_dict() for m in messages]), 200


@chat_bp.route('/send', methods=['POST'])
@jwt_required()
def send_messages():
    user, error_response = get_current_user_or_401()
    if error_response:
        return error_response

    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Request body must be valid JSON"}), 400

        rid = data.get('receiver_id')
        msg_content = data.get('content')

        if rid is None or not msg_content:
            return jsonify({"error": "Receiver ID or Content is missing"}), 400

        try:
            receiver_id = UUID(str(rid))
        except ValueError:
            return jsonify({"error": "Invalid Receiver ID format"}), 400

        new_msg = Message(
            sender_id=user.id,
            receiver_id=receiver_id,
            content=str(msg_content)
        )

        db.session.add(new_msg)
        db.session.commit()

        return jsonify(new_msg.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print(f"DATABASE ERROR: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

