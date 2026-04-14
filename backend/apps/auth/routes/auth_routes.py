from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from apps.auth.controllers.auth_controller import AuthController

router = APIRouter(prefix="/auth")

controller = AuthController()

@router.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    return controller.register(db, email, password)