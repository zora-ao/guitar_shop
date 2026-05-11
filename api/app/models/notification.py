# models/notification.py
from datetime import datetime
from ..extensions import db

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False) # e.g., "Order Update"
    message = db.Column(db.String(255), nullable=False) # e.g., "Your Stratocaster is out for delivery!"
    notif_type = db.Column(db.String(50), default="general")
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "message": self.message,
            "type": self.notif_type,
            "is_read": self.is_read,
            "created_at": self.created_at.strftime("%b %d, %I:%M %p")
        }