from fastapi import FastAPI
from core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from apps.auth.routes.auth_routes import router as auth_router

app = FastAPI()

# CORS Middleware (for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Application was running..."}