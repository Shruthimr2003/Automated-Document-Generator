
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from schemas.auth_schema import LoginRequest, RegisterRequest, TokenResponse
from schemas.user_schema import UserResponse
from utils.dependencies import get_current_user
from pydantic import BaseModel
from services.auth_service import (
    login_user,
    register_user,
    refresh_access_token,
    logout_user
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.get("/me", response_model=UserResponse)
def get_profile(user=Depends(get_current_user)):
    return user

@router.post("/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    user = register_user(db, payload.username, payload.password)
    return {"message": "User registered successfully", "user_id": user.id}

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    access, refresh = login_user(db, payload.username, payload.password)
    return {
        "access_token": access,
        "refresh_token": refresh,
        "token_type": "bearer"
    }

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/refresh", response_model=TokenResponse)
def refresh_token(payload: RefreshRequest, db: Session = Depends(get_db)):
    access, refresh = refresh_access_token(db, payload.refresh_token)
    return {
        "access_token": access,
        "refresh_token": refresh,
        "token_type": "bearer"
    }
    
@router.post("/logout")
def logout(refresh_token: str, db: Session = Depends(get_db)):
    logout_user(db, refresh_token)
    return {"message": "Logged out successfully"}