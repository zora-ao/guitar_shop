from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required   
from ..models.cart import CartItem
from ..models.product import Product
from ..extensions import db

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/update/<int:item_id>", methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    new_quantity = data.get('quantity')

    if new_quantity is None or new_quantity < 1:
        return jsonify({"error": "Quantity must be at least 1"}), 400
    
    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()

    if not item:
        return jsonify({"error": "Item not found"}), 400

    if new_quantity > item.product.stock:
        item.quantity = item.product.stock
        db.session.commit()
        return jsonify({
            "message": f"Limited to max stock: {item.product.stock}",
            "capped": True,
            "new_quantity": item.product.stock
        }), 200
    
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

@cart_bp.route("/add", methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()

    if item:
        new_qty = item.quantity + quantity
        item.quantity = min(new_qty, product.stock)
    else:
        initial_qty = min(quantity, product.stock)
        item = CartItem(
            user_id=user_id,
            product_id=product_id,
            quantity=initial_qty
        )
        db.session.add(item)
    db.session.commit()

    return jsonify({
        "message": "Item added to cart",
        "item": {
            "id": item.id,
            "quantity": item.quantity,
            "product": {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "image_url": product.images[0] if product.images else None,
                "stock": product.stock
            }
        }
    }), 201


@cart_bp.route("/sync", methods=['POST'])
@jwt_required()
def sync_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not isinstance(data, list):
        return jsonify({"error": "Invalid cart data"}), 400

    for item in data:

        product = db.session.get(Product, item['id'])
        if not product:
            continue

        existing_item = CartItem.query.filter_by(
            user_id = user_id,
            product_id = item['id']
        ).first()

        if existing_item:
            new_quantity = existing_item.quantity + item['quantity']
            existing_item.quantity = min(new_quantity, product.stock)
        else:
            initial_quantity = min(item['quantity'], product.stock)
            new_item = CartItem(
                user_id=user_id,
                product_id=item['id'],
                quantity=initial_quantity
            )
            db.session.add(new_item)

    db.session.commit() 
    return get_cart()

@cart_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()

    output = []

    for item in cart_items:

        product = item.product
        primary_image = None

        if product:
            if hasattr(product, 'images') and product.images:
                primary_image = product.images[0]
            else:
                primary_image = product.image_url

        output.append({
            "id": item.id,
            "quantity": item.quantity,
            "product": {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "image_url": primary_image,
                "images": getattr(product, 'images', []),
                "stock": product.stock
            }
        })

    return jsonify(output), 200
