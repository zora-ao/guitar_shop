from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models.product import Product
from ..models.review import Review
from uuid import UUID
from ..utils.auth_helpers import get_current_user_or_401

review_bp = Blueprint('review_bp', __name__)

# --- GET LIST OF REVIEWS ---
@review_bp.route('/<int:product_id>', methods=['GET'])
def get_reviews(product_id):
    # Check if product exists first
    Product.query.get_or_404(product_id)
    
    # Fetch reviews, newest first
    reviews = Review.query.filter_by(product_id=product_id).order_by(Review.created_at.desc()).all()
    
    # Return as list of dictionaries
    return jsonify([r.to_dict() for r in reviews]), 200

# --- GET STATS (FOR DASHBOARD BARS) ---
@review_bp.route('/stats/<int:product_id>', methods=['GET'])
def get_review_stats(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    if not reviews:
        return jsonify({
            "total_reviews": 0, 
            "average_rating": 0, 
            "distribution": {str(i): 0 for i in range(1, 6)}
        })

    total = len(reviews)
    avg = sum(r.rating for r in reviews) / total
    
    distribution = {str(i): 0 for i in range(1, 6)}
    for r in reviews:
        distribution[str(r.rating)] += 1

    return jsonify({
        "total_reviews": total,
        "average_rating": round(avg, 1),
        "distribution": distribution
    })


@review_bp.route('/<int:product_id>', methods=['POST'])
@jwt_required()
def add_review(product_id):
    user, error_response = get_current_user_or_401()
    if error_response:
        return error_response

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"msg": "Request body must be valid JSON"}), 400

    rating = data.get('rating')
    if rating is None or not isinstance(rating, (int, float)) or not (1 <= rating <= 5):
        return jsonify({"msg": "Rating between 1 and 5 is required"}), 400

    product = Product.query.get_or_404(product_id)

    existing_review = Review.query.filter_by(user_id=user.id, product_id=product_id).first()
    if existing_review:
        return jsonify({"msg": "You have already reviewed this product"}), 400

    new_review = Review(
        rating=rating,
        comment=data.get('comment', ""),
        user_id=user.id,
        product_id=product_id
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"msg": "Review added successfully", "review": new_review.to_dict()}), 201
    user_id = UUID(get_jwt_identity())

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"msg": "Request body must be valid JSON"}), 400

    rating = data.get('rating')
    if rating is None or not isinstance(rating, (int, float)) or not (1 <= rating <= 5):
        return jsonify({"msg": "Rating between 1 and 5 is required"}), 400

    product = Product.query.get_or_404(product_id)

    existing_review = Review.query.filter_by(user_id=user_id, product_id=product_id).first()
    if existing_review:
        return jsonify({"msg": "You have already reviewed this product"}), 400

    new_review = Review(
        rating=rating,
        comment=data.get('comment', ""),
        user_id=user_id,
        product_id=product_id
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"msg": "Review added successfully", "review": new_review.to_dict()}), 201