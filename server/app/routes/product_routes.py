from flask import Flask, Blueprint, jsonify, request
from app.models.product import Product
from app.extentions import db
import cloudinary.uploader

product_bp = Blueprint("products", __name__)

@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@product_bp.route('/', methods=['POST'])
def create_product():
    name = request.form.get("name")
    price = request.form.get("price")
    description = request.form.get("description")
    brand = request.form.get("brand")
    image = request.files.get("image")

    if not all([name, price, description, brand, image]):
        return jsonify({"error": "Missing fields"}), 400
    
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