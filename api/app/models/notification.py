# models/notification.py
from datetime import datetime, timezone
from ..extensions import db
from sqlalchemy.dialects.postgresql import UUID 

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    
    title = db.Column(db.String(100), nullable=False) # e.g., "Order Update"
    message = db.Column(db.String(255), nullable=False) # e.g., "Your Stratocaster is out for delivery!"
    notif_type = db.Column(db.String(50), default="general")
    is_read = db.Column(db.Boolean, default=False)
    
    # Updated to a timezone-aware lambda to avoid the deprecated utcnow
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": str(self.user_id), # Safely cast the UUID to a string for JSON responses
            "title": self.title,
            "message": self.message,
            "type": self.notif_type,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat() + "Z" if not self.created_at.isoformat().endswith('Z') else self.created_at.isoformat()
        }