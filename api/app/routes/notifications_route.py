from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.notification import Notification
from ..extensions import db
from uuid import UUID

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/get_notif', methods=['GET'])
@jwt_required()
def get_user_notifications():
    user_id = UUID(get_jwt_identity())
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    return jsonify([n.to_dict() for n in notifications]), 200

@notifications_bp.route('/read-all', methods=['POST'])
@jwt_required()
def mark_notifications_read():
    try:
        # 1. Ensure user_id is the correct type (Integer)
        raw_identity = get_jwt_identity()
        user_id = int(raw_identity)

        # 2. Perform the update
        updated_count = Notification.query.filter_by(
            user_id=user_id, 
            is_read=False
        ).update({Notification.is_read: True}, synchronize_session=False)

        # 3. Explicitly commit to save to the DB file
        db.session.commit()
        
        print(f"SUCCESS: Marked {updated_count} notifications read for User {user_id}")
        return jsonify({"message": "success", "count": updated_count}), 200

    except Exception as e:
        db.session.rollback()
        print(f"ERROR: {str(e)}")
        return jsonify({"message": "Internal Server Error"}), 500