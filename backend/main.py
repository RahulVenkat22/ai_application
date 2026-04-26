from fastapi import FastAPI
from core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from apps.auth.routes.auth_routes import router as auth_router
from apps.auth.routes.user_routes import router as user_router

from fastapi import FastAPI, Request
from starlette.responses import JSONResponse
from core.database import SessionLocal
from core.security import decode_token


app = FastAPI()

# CORS Middleware (for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def middleware(request: Request, call_next):
    print("Middleware executed for path:", request.url.path)
    request.state.db = SessionLocal()

    PUBLIC = ["/auth/login", "/auth/refresh", "/docs", "/openapi.json"]

    if request.method == "OPTIONS":
        response = await call_next(request)
        request.state.db.close()
        return response

    if request.url.path not in PUBLIC:
        auth = request.headers.get("Authorization")

        if not auth:
            return JSONResponse(status_code=401, content={"detail": "No token"})

        token = auth.split(" ")[1]
        payload = decode_token(token)

        if not payload:
            return JSONResponse(status_code=401, content={"detail": "Invalid token"})

        request.state.user = payload

    response = await call_next(request)
    request.state.db.close()
    return response

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(user_router)

@app.get("/")
def root():
    return {"message": "Application was running..."}