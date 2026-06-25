import time
from collections import defaultdict

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import verify_password, create_access_token
from app.db.session import get_db
from app.models.models import User
from app.schemas.schemas import LoginRequest, TokenOut

router = APIRouter(prefix="/api/auth", tags=["Auth"])

# Simple in-memory rate limiter: max 5 attempts per IP per 60s
_login_attempts: dict[str, list[float]] = defaultdict(list)
_RATE_LIMIT = 5
_WINDOW = 60


def _check_rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    _login_attempts[ip] = [t for t in _login_attempts[ip] if now - t < _WINDOW]
    if len(_login_attempts[ip]) >= _RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Too many login attempts. Try again later.")
    _login_attempts[ip].append(now)


@router.post("/login", response_model=TokenOut)
async def login(request: Request, data: LoginRequest, db: AsyncSession = Depends(get_db)):
    _check_rate_limit(request)
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return TokenOut(access_token=token)
