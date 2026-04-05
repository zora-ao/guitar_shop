from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required   
from app.models.cart import CartItem
from app.models.product import Product
from app.extentions import db

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/sync", methods=['POST'])
@jwt_required()
def sync_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not isinstance(data, list):
        return jsonify({"error": "Invalid cart data"}), 400
    
    for item in data:
        existing_item = CartItem.query.filter_by(
            user_id=user_id,
            product_id=item['id']
        ).first()

        if existing_item:
            existing_item.quantity += item['quantity']
            db.session.add(existing_item)
        else:
            new_item = CartItem(
                user_id=user_id,
                product_id=item['id'],
                quantity=item['quantity']
            )

            db.session.add(new_item)
    db.session.commit() 
    return jsonify({"message": "Cart synced Successfully"}), 200

@cart_bp.route('/', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    items = CartItem.query.filter_by(user_id=user_id).all()

    return jsonify([item.to_dict() for item in items]), 200
