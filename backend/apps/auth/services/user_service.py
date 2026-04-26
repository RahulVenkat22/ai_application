from apps.auth.repositories.user_repository import UserRepository
from core.security import hash_password

repo = UserRepository()

class UserService:

    def create_user(self, payload, db):
        password = repo.generate_random_string(10)
        print(f" REAL PASSWORD : {password} \n" * 500)
        hashed_password = hash_password(password)
        return repo.create_user(payload, hashed_password, db)
    
    def list_users(self, db):
        return repo.list_users(db)
    
    def update_user(self, user_id, payload, db):
        return repo.update_user(user_id, payload, db)

    def delete_user(self, user_id, db):
        return repo.delete_user(user_id, db)