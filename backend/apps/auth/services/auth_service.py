from apps.auth.repositories.auth_repository import AuthRepository

repo = AuthRepository()

class AuthService:

    def register(self, db, email, password):
        return repo.create_user(db, email, password)

    def get_user(self, db, email):
        return repo.get_user_by_email(db, email)