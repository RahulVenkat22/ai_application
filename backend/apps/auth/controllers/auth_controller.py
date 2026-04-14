from apps.auth.services.auth_service import AuthService

service = AuthService()

class AuthController:

    def register(self, db, email, password):
        return service.register(db, email, password)