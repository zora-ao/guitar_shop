from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.messages import Message
from ..extensions import db

chat_bp = Blueprint('chat', __name__)

@chat_bp.route("/history/<int:other_user_id>", methods=['GET'])
@jwt_required()
def get_chat_history(other_user_id):
    current_user_id = int(get_jwt_identity())

    messages = Message.query.filter(
        ((Message.sender_id == current_user_id) & (Message.receiver_id == other_user_id)) |
        ((Message.sender_id == other_user_id) & (Message.receiver_id == current_user_id)    )
    ).order_by(Message.created_at.asc()).all()

    return jsonify([m.to_dict() for m in messages]), 200

@chat_bp.route('/send', methods=['POST'])
@jwt_required()
def send_messages():
    current_user_id = int(get_jwt_identity())

    data = request.get_json()

    new_msg = Message(
        sender_id = current_user_id,
        receiver_id=data.get('receiver_id'),
        content=data.get('content')
    )

    db.session.add(new_msg)
    db.session.commit()

    return jsonify(new_msg.to_dict()), 201
