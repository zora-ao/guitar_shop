from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from datetime import datetime, timedelta
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

@admin_bp.route('/dashboard-summary', methods=['GET'])
@jwt_required()
def get_dashboard_summary():
    # 1. Totals
    platform_fee_rate = 0.05
    raw_revenue = db.session.query(func.sum(Order.total_amount)).scalar() or 0
    total_sales = Order.query.count()
    total_revenue = db.session.query(func.sum(Order.total_amount)).scalar() or 0
    total_users = User.query.count()
    total_items = Product.query.count()

    available_payout = float(raw_revenue) * (1 - platform_fee_rate)

    # 2. Trends
    today = datetime.utcnow()
    last_30_days = today - timedelta(days=30)
    prev_30_days = today - timedelta(days=60)
    last_24_hours = today - timedelta(hours=24)

    current_period_sales = Order.query.filter(Order.created_at >= last_30_days).count()
    prev_period_sales = Order.query.filter(Order.created_at.between(prev_30_days, last_30_days)).count()

    sales_trend = 0
    if prev_period_sales > 0:
        sales_trend = round(((current_period_sales - prev_period_sales) / prev_period_sales) * 100)

    # 3. Graph Data (Last 6 Months)
    # Note: We group by the formatted month, but we sort by the minimum timestamp in that group
    

    graph_results = db.session.query(
        func.to_char(Order.created_at, 'HH24:00').label('label'),
        func.sum(Order.total_amount).label('rev'),
        func.date_trunc('hour', Order.created_at).label('sort_key')
    ).filter(Order.created_at >= last_24_hours)\
        .group_by(func.date_trunc('hour', Order.created_at), 'label')\
        .order_by('sort_key')\
        .all()

    graph_data = [{"name": r.label, "rev": float(r.rev)} for r in graph_results]

    return jsonify({
        "stats": {
            "sales": total_sales,
            "revenue": f"₱{total_revenue:,.0f}",
            "users": total_users,
            "items": total_items,
            "trends": { "sales": sales_trend, "revenue": 8, "users": -2 }
        },
        "graphData": graph_data,
        "payout": available_payout # Now dynamic!
    }), 200