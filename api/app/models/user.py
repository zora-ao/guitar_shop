import uuid 
from ..extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import UUID 

class User(db.Model):
    __tablename__ = "users"

    # Fully locked-in UUID setup with Python-side generation
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default="customer")

    # Relationships
    reviews = db.relationship('Review', backref='author', lazy=True)

    def set_password(self, password):
        """Hashes the password before saving it to the database."""
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        """Checks the plain text password against the stored hash."""
        return check_password_hash(self.password, password)

    def to_dict(self):
        """Converts the model data into a clean JSON dictionary."""
        return {
            "id": str(self.id),  # Safely converts the UUID object into a string format
            "username": self.username,
            "email": self.email,
            "role": self.role
        }