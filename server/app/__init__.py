import os
from flask import Flask
from app.extentions import db, migrate
from app.config import Config
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET")
    )

    db.init_app(app)
    migrate.init_app(app, db)

    # Register the blueprints
    from app.routes.product_routes import product_bp
    app.register_blueprint(product_bp, url_prefix="/api/products")

    return app