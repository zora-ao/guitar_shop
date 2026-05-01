from flask import Blueprint, request, jsonify
from ..models.user import User
from ..extensions import db
from flask_jwt_extended import create_access_token, set_access_cookies, unset_access_cookies, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    user_exist = User.query.filter_by(email=email).first()

    if user_exist:
        return jsonify({"error": "User already exists"}), 400
    
    user = User(email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid Credentials"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    
    resp = jsonify({
        "message": "Login Successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    })

    set_access_cookies(resp, access_token)

    return resp

@auth_bp.route('/logout', methods=["POST"])
def logout():
    resp = jsonify({"message": "Logged out"})
    unset_access_cookies(resp)
    return resp, 200

@auth_bp.route('/me', methods=["GET"])
@jwt_required()
def get_me():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            }
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500