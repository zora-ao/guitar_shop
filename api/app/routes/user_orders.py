from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.order import OrderItem, Order
from ..extensions import db

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/<int:order_id>/cancel', methods=['PATCH'])
@jwt_required()
def cancel_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first_or_404()

    if order.status.lower() != 'pending':
        return jsonify({"error": "Order can't be cancelled as it is already " + order.status}), 400
    
    order.status = 'Cancelled'
    db.session.commit()

    return jsonify({"message": "Order cancelled successfully", "order_id": order_id}), 200

@orders_bp.route('/my-orders', methods=['GET'])
@jwt_required()
def get_user_orders():
    user_id = get_jwt_identity()

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination_obj = OrderItem.query.join(Order).filter(Order.user_id == user_id)\
        .order_by(Order.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)

    orders = pagination_obj.items

    output = []

    for item in orders:
        product = item.product
        parent_order = item.order

        if not product or not parent_order:
            continue

        primary_img = product.images[0] if (product.images and len(product.images) > 0) else "/placeholder-image.png"

        output.append({
            "order_id": parent_order.id,
            "product_name": product.name,
            "price": float(item.price_at_purchase),
            "quantity": item.quantity,
            "image_url": primary_img,
            "status": parent_order.status,
            "payment_method": parent_order.payment_method,
            "date": parent_order.created_at.strftime("%a %b %d %Y")
        })
    
    return jsonify({
        "orders": output,
        "total_pages": pagination_obj.pages,
        "current_page": pagination_obj.page,
        "total_items": pagination_obj.total,
        "has_next": pagination_obj.has_next,
        "has_prev": pagination_obj.has_prev
    }), 200

