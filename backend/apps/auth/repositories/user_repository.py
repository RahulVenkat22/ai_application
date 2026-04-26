import random
import string
from apps.auth.models.user_model import User


class UserRepository:

    def create_user(self, payload, hashed_password, db):
        user = User(
            email=payload.email,
            first_name=payload.first_name,
            last_name=payload.last_name,
            mobile_number=payload.mobile_number,
            password=hashed_password
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def get_user_by_email(self, db, email):
        return db.query(User).filter(User.email == email).first()

    def list_users(self, db):
        print(f"DB WAS HITTED")
        return db.query(User).all()
    
    # Generate a random string of 8 unique characters
    def generate_random_string(self, length = 10):
        return ''.join(random.sample(string.ascii_letters, length))

    def update_user(self, user_id, payload, db):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise Exception("User not found")
        
        user.first_name = payload.first_name
        user.last_name = payload.last_name
        user.email = payload.email
        user.mobile_number = payload.mobile_number
        db.commit()
        db.refresh(user)
        return user

    def delete_user(self, user_id, db):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise Exception("User not found")
        
        db.delete(user)
        db.commit()
        return {"message": "User deleted successfully"}