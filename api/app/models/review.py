from ..extensions import db
from sqlalchemy.dialects.postgresql import UUID 

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    
    # Changed from db.Integer to UUID(as_uuid=True) to match the users table
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    
    # Kept as Integer to match your products table structure
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())


    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "comment": self.comment,
            "user_id": str(self.user_id) if self.user_id else None,
            "username": self.author.username if self.author else "Guest", 
            "created_at": self.created_at.isoformat()
        }