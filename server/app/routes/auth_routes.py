from flask import Blueprint, request, jsonify
from app.models.user import User
from app.extentions import db
from flask_jwt_extended import create_access_token, set_access_cookies, unset_access_cookies

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    email = data["email"]
    password = data["password"]
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

    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid Credentials"}), 401
    
    token = create_access_token(identity=user.id)
    
    resp = jsonify({
        "message": "Login Successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    })

    set_access_cookies(resp, token)

    return resp

@auth_bp.route('/logout', methods=["POST"])
def logout():
    resp = jsonify({"message": "Logged out"})
    unset_access_cookies(resp)
    return resp


