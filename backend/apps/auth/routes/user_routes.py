from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from apps.auth.controllers.user_controller import UserController
from apps.auth.schema.user_schemas import CreateUserRequest
from core.database import get_db

router = APIRouter(prefix="/user")
controller = UserController()

@router.post("/")
def create_user(payload: CreateUserRequest, db: Session = Depends(get_db)):
    return controller.create_user(payload, db)

@router.get("/")
def list_users(db: Session = Depends(get_db)):
    return controller.list_users(db)

@router.put("/{user_id}")
def update_user(user_id: int, payload: CreateUserRequest, db: Session = Depends(get_db)):
    try:
        return controller.update_user(user_id, payload, db)
    except Exception as e:
        return {"error": str(e)}
    
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    try:
        return controller.delete_user(user_id, db)
    except Exception as e:
        return {"error": str(e)}
