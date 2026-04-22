from Flask import Blueprint, request, jsonify
from app.extentions import db
from app.models.order import Order, OrderItem
from app.models.product import Product

checkout_bp = Blueprint('/api/checkout', methods=['POST'])
def create_order():
    data = request.get_json()

    try: 
        new_order = Order(
            user_id=data['user_id'],
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

            product = Product.query.get(item['product_id'])
            if product:
                product.stock -= item['quantity']
            
        db.session.commit()
        return jsonify({"message": "Order placed successfully", "order_id": new_order.id}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

    