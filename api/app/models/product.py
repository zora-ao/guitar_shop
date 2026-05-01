from ..extensions import db
from sqlalchemy.dialects.postgresql import ARRAY

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    is_best_seller = db.Column(db.Boolean)
    stock = db.Column(db.Integer, default=0, nullable=False)
    images = db.Column(ARRAY(db.String), default=[])


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "category": self.category,
            "is_best_seller": self.is_best_seller,
            "stock": self.stock,
            "images": self.images,
        }

