from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.order import Order, OrderItem
from ..models.product import Product
from ..models.cart import CartItem

checkout_bp = Blueprint('checkout', __name__)

@checkout_bp.route('/', methods=['POST'], strict_slashes=False)
def create_order():
    data = request.get_json()

    try: 
        new_order = Order(
            user_id=data.get('user_id'),
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone=data['phone'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zip_code=data['zip_code'],
            payment_method=data['payment_method'],
            subtotal=data['subtotal'],
            shipping_fee=data['shipping_fee'],
            total_amount=data['total_amount']
        )

        db.session.add(new_order)
        db.session.flush()

        for item in data['items']:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price_at_purchase=item['price']
            )
            db.session.add(order_item)

            product = db.session.get(Product, item['product_id'])
            if product:
                product.stock -= item['quantity']
        
        if new_order.user_id:
            CartItem.query.filter_by(user_id=new_order.user_id).delete()
            
        db.session.commit()
        return jsonify({"message": "Order placed successfully", "order_id": new_order.id}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

    