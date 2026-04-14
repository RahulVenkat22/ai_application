from apps.auth.models.user_model import User

class AuthRepository:

    def create_user(self, db, email, password):
        user = User(email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def get_user_by_email(self, db, email):
        return db.query(User).filter(User.email == email).first()