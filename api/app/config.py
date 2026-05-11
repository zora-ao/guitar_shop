import os

class Config:
    # Use the env var if it exists, otherwise fallback to local
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:A40o8ccjr@localhost/guitar_shop"
    )
    
    # Fixed the plural 'S' here
    SQLALCHEMY_TRACK_MODIFICATIONS = False