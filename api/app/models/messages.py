from ..extensions import db
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import UUID 

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    
    sender_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    
    content = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": str(self.sender_id),      
            "receiver_id": str(self.receiver_id),  
            "content": self.content,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat() + "Z" if not self.created_at.isoformat().endswith('Z') else self.created_at.isoformat()
        }