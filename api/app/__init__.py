import os
from flask import Flask
from .extensions import db, migrate
from .config import Config
from flask_cors import CORS
import cloudinary
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    database_url = os.getenv("DATABASE_URL")
    
    if database_url:
        # 1. Fix the dialect (SQLAlchemy requires postgresql://)
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql://", 1)
        
        # 2. Force SSL (Essential for Supabase cloud connections)
        if "sslmode" not in database_url:
            separator = "&" if "?" in database_url else "?"
            database_url += f"{separator}sslmode=require"
        
        # Overwrite the config with the cleaned URL
        app.config["SQLALCHEMY_DATABASE_URI"] = database_url

    is_prod = os.getenv("FLASK_ENV") == "production"

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # change later
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  # store JWT in cookies
    app.config["JWT_COOKIE_SECURE"] = is_prod         # True if using HTTPS in production
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"      # cookie is valid for whole site
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_COOKIE_SAMESITE"] = "None" if is_prod else "Lax"
    app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token_cookie"

    jwt.init_app(app)

    CORS(
        app,
        supports_credentials=True,  
        origins=[
            "https://guitar-shop-rho-teal.vercel.app",
            "http://localhost:5173",
        ])

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
    from app.routes.cart_route import cart_bp
    from app.routes.checkout import checkout_bp
    from app.routes.admin_orders import admin_bp
    from app.routes.user_orders import orders_bp

    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(checkout_bp, url_prefix="/api/checkout")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")

    return app