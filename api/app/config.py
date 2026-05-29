import os
from dotenv import load_dotenv

# Load variables from the .env file into the system environment
load_dotenv()

class Config:
    # SQLALCHEMY_DATABASE_URI = os.environ.get(
    #     "DATABASE_URL", 
    #     "postgresql://postgres:A40o8ccjr@localhost/guitar_shop"
    # )

    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:A40o8ccjr@localhost/guitar_shop"

    
    SQLALCHEMY_TRACK_MODIFICATIONS = False