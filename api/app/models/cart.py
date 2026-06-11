from ..extensions import db
from sqlalchemy.dialects.postgresql import UUID 

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    
    quantity = db.Column(db.Integer, default=1)

    product = db.relationship('Product', back_populates='cart_items')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": str(self.user_id), 
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product_details": self.product.to_dict()
        }