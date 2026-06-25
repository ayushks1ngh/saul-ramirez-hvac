from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.db.redis import redis_client
from app.models.models import QuoteRequest
from app.schemas.schemas import QuoteCreate, QuoteOut
from app.services.email_service import enqueue_email

router = APIRouter(prefix="/api/quotes", tags=["Quotes"])


@router.post("", response_model=QuoteOut, status_code=status.HTTP_201_CREATED)
async def create_quote(data: QuoteCreate, db: AsyncSession = Depends(get_db)):
    quote = QuoteRequest(**data.model_dump())
    db.add(quote)
    await enqueue_email(db, data.email, f"Quote request received — {data.requested_service}")
    await db.commit()
    await db.refresh(quote)
    await redis_client.delete("dashboard_metrics")
    return quote


@router.get("", response_model=list[QuoteOut])
async def list_quotes(skip: int = 0, limit: int = 50, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(QuoteRequest).order_by(QuoteRequest.created_at.desc()).offset(skip).limit(limit)
    )
    return result.scalars().all()
