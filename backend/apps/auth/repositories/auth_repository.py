from ..models.auth_model import RefreshToken

class AuthRepository:

    def create_refresh_token(self, db, user_id, token_hash, expires_at):
        token = RefreshToken(
            user_id=user_id,
            token_hash=token_hash,
            expires_at=expires_at
        )
        db.add(token)
        db.commit()
        return token


    def get_refresh_token(self, db, token_hash):
        return db.query(RefreshToken).filter(
            RefreshToken.token_hash == token_hash,
            RefreshToken.is_revoked == False
        ).first()


    def revoke_token(self, db, token):
        token.is_revoked = True
        db.commit()