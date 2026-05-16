import os
from flask import Flask
from .extensions import db, migrate
from .config import Config
from flask_cors import CORS
import cloudinary
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

# Load .env file at the very start
load_dotenv()

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    
    # 1. Load initial config from Config class
    app.config.from_object(Config)

    # 2. Get the URI that was loaded (either from Env or Localhost fallback)
    uri = app.config.get("SQLALCHEMY_DATABASE_URI")
    
    if uri:
        # Fix the dialect (SQLAlchemy 2.0+ requirement)
        if uri.startswith("postgres://"):
            uri = uri.replace("postgres://", "postgresql://", 1)
        
        # Only force SSL if we are NOT on localhost
        # This prevents local connection errors while keeping Cloud DBs secure
        if "localhost" not in uri and "127.0.0.1" not in uri:
            if "sslmode" not in uri:
                separator = "&" if "?" in uri else "?"
                uri += f"{separator}sslmode=require"
        
        # Update the config with the sanitized URI
        app.config["SQLALCHEMY_DATABASE_URI"] = uri

    # This print will reveal exactly where the "Ghost" data is coming from
    print(f"\n--- DATABASE CONNECTION: {app.config['SQLALCHEMY_DATABASE_URI']} ---\n")

    # JWT & Env Settings
    is_prod = os.getenv("FLASK_ENV") == "production"
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_SECURE"] = is_prod
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_COOKIE_SAMESITE"] = "None" if is_prod else "Lax"
    app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token_cookie"

    jwt.init_app(app)

    CORS(
        app,
        supports_credentials=True,  
        origins=["http://localhost:5173"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET")
    )

    db.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints
    from app.routes.product_routes import product_bp
    from app.routes.auth_routes import auth_bp
    from app.routes.cart_route import cart_bp
    from app.routes.checkout import checkout_bp
    from app.routes.admin_orders import admin_bp
    from app.routes.user_orders import orders_bp
    from app.routes.reviews_route import review_bp
    from app.routes.notifications_route import notifications_bp
    from app.routes.chat_route import chat_bp

    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(checkout_bp, url_prefix="/api/checkout")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")
    app.register_blueprint(review_bp, url_prefix="/api/reviews")
    app.register_blueprint(notifications_bp, url_prefix="/api/notifications")
    app.register_blueprint(chat_bp, url_prefix="/api/chat")

    with app.app_context():
        
        print("Creating database tables...")
        db.create_all() 
        print("Tables created successfully!")

    return app