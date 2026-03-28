import os
from flask import Flask
from app.extentions import db, migrate
from app.config import Config
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    app.config["JWT_SECRET_KEY"] = "super-secret-key"  # change later
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  # store JWT in cookies
    app.config["JWT_COOKIE_SECURE"] = False         # True if using HTTPS in production
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"      # cookie is valid for whole site
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False

    jwt.init_app(app)

    CORS(
        app,
        supports_credentials=True,  
        origins=["http://localhost:5173"]
    )

    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET")
    )

    db.init_app(app)
    migrate.init_app(app, db)

    # Register the blueprints
    from app.routes.product_routes import product_bp
    from app.routes.auth_routes import auth_bp

    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app