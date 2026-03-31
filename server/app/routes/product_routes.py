from flask import Flask, Blueprint, jsonify, request
from app.models.product import Product
from app.extentions import db
import cloudinary.uploader
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User

product_bp = Blueprint("products", __name__)

@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@product_bp.route('/add_products', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))


    if user.role != "admin":
        return jsonify({"error": "Admin only"}), 403

    name = request.form.get("name")
    price = request.form.get("price")
    description = request.form.get("description")
    brand = request.form.get("brand")
    image = request.files.get("image")

    if not all([name, price, description, brand, image]):
        return jsonify({"error": "Missing fields"}), 400
    
    try:
        price = float(price)
    except ValueError:
        return jsonify({"error": "Price must be a number"}), 422
    
    result = cloudinary.uploader.upload(image)
    image_url = result["secure_url"]

    product = Product(
        name = name, 
        price = price,
        image_url = image_url,
        description = description,
        brand = brand,
    )

    db.session.add(product)
    db.session.commit()

    return jsonify(product.to_dict()), 201

@product_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if user.role != 'admin':
        return jsonify({"error": "Admin only"}), 403

    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Deleted"})