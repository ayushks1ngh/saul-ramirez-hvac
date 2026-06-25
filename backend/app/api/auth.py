from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import verify_password, create_access_token
from app.db.session import get_db
from app.models.models import User
from app.schemas.schemas import LoginRequest, TokenOut

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login", response_model=TokenOut)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return TokenOut(access_token=token)
