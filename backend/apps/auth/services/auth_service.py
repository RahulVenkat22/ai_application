from apps.auth.repositories.auth_repository import AuthRepository
from datetime import datetime, timedelta
from core.security import (
    verify_password,
    hash_token,
    create_access_token,
    create_refresh_token
)

repo = AuthRepository()

class AuthService:

    def login_user(self, db, user):
        access_token = create_access_token({"user_id": user.id})

        refresh_token = create_refresh_token()
        token_hash = hash_token(refresh_token)

        expires_at = datetime.utcnow() + timedelta(days=7)

        repo.create_refresh_token(
            db, user.id, token_hash, expires_at
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token
        }


    def refresh_access_token(self, db, refresh_token):
        token_hash = hash_token(refresh_token)

        token = repo.get_refresh_token(db, token_hash)

        if not token:
            return None

        if token.expires_at < datetime.utcnow():
            return None

        access_token = create_access_token({"user_id": token.user_id})

        return {"access_token": access_token}