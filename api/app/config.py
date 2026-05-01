import os 

class Config:
    SQLALCHEMY_DATABASE_URI= os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:A40o8ccjr@localhost/guitar_shop"
    )
    SQLALCHEMY_TRACK_MODIFICATION = False