from apps.auth.services.user_service import UserService

service = UserService()

class UserController:

    def list_users(self, db):
        return service.list_users(db)
    
    def create_user(self, payload, db):
        return service.create_user(payload, db)
    
    def update_user(self, user_id, payload, db):
        return service.update_user(user_id, payload, db)

    def delete_user(self, user_id, db):
        return service.delete_user(user_id, db)