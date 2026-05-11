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


@product_bp.route("/add_products", methods=["POST"])
def add_product():
    try:
        # 1. Use request.form for the text fields
        name = request.form.get("name")
        price = request.form.get("price")
        description = request.form.get("description")
        category = request.form.get("category")
        stock = request.form.get("stock")
        is_best_seller = request.form.get("isBestSeller") == "true"

        # 2. Handle the Images
        # Note: Your frontend sends multiple files under the key 'images'
        uploaded_files = request.files.getlist("images")
        image_filenames = []

        # TEMPORARY LOGIC: In a real app, you'd upload to Cloudinary or S3.
        # For now, let's just grab the names or save them locally.
        for file in uploaded_files:
            if file.filename:
                filename = secure_filename(file.filename)
                # Save file code here if needed: file.save(os.path.join(UPLOAD_FOLDER, filename))
                image_filenames.append(filename) 

        # 3. Create the product object
        new_product = Product(
            name=name,
            price=float(price),
            description=description,
            category=category,
            stock=int(stock),
            is_best_seller=is_best_seller,
            images=image_filenames  # This matches your ARRAY(db.String)
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify({"message": "Product added successfully", "product": new_product.to_dict()}), 201

    except Exception as e:
        db.session.rollback()
        print(f"BACKEND ERROR: {str(e)}") # Watch your terminal for this!
        return jsonify({"error": str(e)}), 500

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

    # 1. Update basic fields
    product.name = request.form.get("name", product.name)
    product.description = request.form.get("description", product.description)
    product.category = request.form.get("category", product.category)
    
    # Check for the correct key from React (is_best_seller)
    is_best = request.form.get("is_best_seller")
    if is_best is not None:
        product.is_best_seller = (is_best.lower() == 'true')

    if "price" in request.form:
        product.price = float(request.form["price"])
    if "stock" in request.form:
        product.stock = int(request.form["stock"])

    # 2. Update Gallery
    try:
        # Parse existing images (the ones kept in the gallery)
        existing_images_raw = request.form.get('existing_images', '[]')
        kept_images = json.loads(existing_images_raw)

        # Handle new uploads
        new_files = request.files.getlist("images")
        new_urls = []
        for file in new_files:
            if file and file.filename != '': # Ensure file isn't empty
                upload_result = cloudinary.uploader.upload(file)
                new_urls.append(upload_result["secure_url"])
        
        # Combine lists
        product.images = kept_images + new_urls
        
        # This is vital for JSON columns!
        flag_modified(product, "images")

    except Exception as e:
        print(f"Update Error: {e}")
        return jsonify({"error": "Image processing failed"}), 500
    
    db.session.commit()
    return jsonify(product.to_dict()), 200