from flask import Blueprint, jsonify, request
from ..models.product import Product
from ..extensions import db
import cloudinary.uploader
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from sqlalchemy.orm.attributes import flag_modified
import json

product_bp = Blueprint("products", __name__)

@product_bp.route("/", methods=["GET"], strict_slashes=False)
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@product_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict()), 200


@product_bp.route('/add_products', methods=['POST'])
@jwt_required()
def add_product():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user or user.role != "admin":
        return jsonify({"error": "Admin only"}), 403

    name = request.form.get("name")
    price = request.form.get("price")
    description = request.form.get("description")
    category = request.form.get("category")
    stock = request.form.get("stock", 0)
    is_best_seller = request.form.get("isBestSeller") == 'true'
    
    uploaded_files = request.files.getlist('images')
    image_urls = []

    if not uploaded_files:
        image_urls = ["/placeholder-image.png"]
    else:
        for file in uploaded_files:
            try:
                upload_result = cloudinary.uploader.upload(file)
                image_urls.append(upload_result['secure_url'])
            except Exception as e:
                print(f"Cloudinary Error: {e}")


    if not all([name, price, description, category]):
        return jsonify({"error": "Missing fields"}), 400
    
    try:
        price = float(price)
        stock = int(stock)
    except ValueError:
        return jsonify({"error": "Price and Stock must be a number"}), 422
    

    product = Product(
        name = name, 
        price = price,
        images = image_urls,
        description = description,
        category = category,
        stock = stock,
        is_best_seller = is_best_seller
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

@product_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user or user.role != 'admin':
        return jsonify({"error": "Admin access required"}), 403
    
    product = Product.query.get_or_404(id)

    product.name = request.form.get("name", product.name)
    product.description = request.form.get("description", product.description)
    product.category = request.form.get("category", product.category)
    product.is_best_seller = request.form.get("is_best_seller") == 'true'

    if "price" in request.form:
        product.price = float(request.form["price"])
    if "stock" in request.form:
        product.stock = int(request.form["stock"])

    try:
        existing_image_raw = request.form.get('existing_images', '[]')
        kept_images = json.loads(existing_image_raw)

        new_files = request.files.getlist("images")
        new_uploaded_urls = []

        for file in new_files:
            if file:
                upload_result = cloudinary.uploader.upload(file)
                new_uploaded_urls.append(upload_result["secure_url"])
        
        product.images = kept_images + new_uploaded_urls

        flag_modified(product, "images")

    except Exception as e:
        return jsonify({"error": f"Gallery update failed: {str(e)}"}), 500
    
    db.session.commit()
    return jsonify(product.to_dict()), 200
