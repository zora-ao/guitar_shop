from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required   
from app.models.cart import CartItem
from app.models.product import Product
from app.extentions import db

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/update/<int:item_id>", methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    new_quantity = data.get('quantity')

    if new_quantity is None or new_quantity < 1:
        return jsonify({"error": "Quantity must be at least 1"}), 400
    
    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()

    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    item.quantity = new_quantity
    db.session.commit()

    return jsonify({"message": "Quantity updated successfully"}), 200


@cart_bp.route("/delete/<int:item_id>", methods=['DELETE'])
@jwt_required()
def delete_cart_item(item_id):
    user_id = get_jwt_identity()

    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()

    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item removed from the cart"}), 200


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

@cart_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()

    output = []

    for item in cart_items:
        output.append({
            "id": item.id,
            "quantity": item.quantity,
            "product": {
                "id": item.product.id,
                "name": item.product.name,
                "price": item.product.price,
                "image_url": item.product.image_url
            }
        })

    return jsonify(output), 200
