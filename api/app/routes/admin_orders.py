from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.order import Order, OrderItem
from ..models.product import Product
from ..models.user import User
from ..extensions import db


admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_all_orders():

    orders = Order.query.order_by(Order.created_at.desc()).all()

    output = []

    for order in orders:
        order_data = {
            "id": order.id,
            "first_name": order.first_name,
            "last_name": order.last_name,
            "email": order.email,
            "phone": order.phone,
            "address": order.address,
            "city": order.city,
            "state": order.state,
            "zip_code": order.zip_code,
            "total_amount": float(order.total_amount),
            "payment_method": order.payment_method,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "items": []
        }

        for item in order.items:

            product = db.session.get(Product, item.product_id)

            primary_image = None
            if product:
                if hasattr(product, 'images') and product.images:
                    primary_image = product.images[0]
                else:
                    primary_image = product.image_url

            order_data['items'].append({
                "product_id": item.product_id,
                "product_name": product.name if product else "Unknown Product",
                "image_url": primary_image,
                "quantity": item.quantity,
                "stock_remaining": product.stock,
                "price": float(item.price_at_purchase)
            })
        
        output.append(order_data)

    return jsonify(output), 200

@admin_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()

    new_status = data.get('status')
    if not new_status:
        return jsonify({"error": "Status is required"}), 400
    
    order.status = new_status
    db.session.commit()

    return jsonify({"message": f"Order status updated to {new_status}"}), 200