from fastapi import APIRouter, Request
from apps.auth.controllers.auth_controller import AuthController

router = APIRouter(prefix="/auth")

controller = AuthController()

@router.post("/login")
def login(data: dict, request: Request):
    db = request.state.db
    return controller.login(db, data["email"], data["password"])


@router.post("/refresh")
def refresh(data: dict, request: Request):
    db = request.state.db
    return controller.refresh(db, data["refresh_token"])