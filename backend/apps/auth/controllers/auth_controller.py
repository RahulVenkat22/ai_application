from fastapi import HTTPException
from core.security import verify_password
from apps.auth.services import auth_service
from apps.auth.repositories.user_repository import UserRepository  # you must have this
from apps.auth.services.auth_service import AuthService

service = AuthService()
user_repository = UserRepository()
class AuthController:

    def login(self, db, email, password):
        user = user_repository.get_user_by_email(db, email)

        if not user or not verify_password(password, user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return service.login_user(db, user)


    def refresh(self, db, refresh_token):
        result = service.refresh_access_token(db, refresh_token)

        if not result:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        return result