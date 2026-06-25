import json

from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.db.redis import redis_client
from app.middleware.auth import get_current_user
from app.models.models import Lead, QuoteRequest, User
from app.schemas.schemas import DashboardMetrics, LeadOut, QuoteOut

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/dashboard", response_model=DashboardMetrics)
async def dashboard(db: AsyncSession = Depends(get_db), _user: User = Depends(get_current_user)):
    cached = await redis_client.get("dashboard_metrics")
    if cached:
        return DashboardMetrics.model_validate_json(cached)

    total_leads = (await db.execute(func.count(Lead.id))).scalar() or 0
    new_leads = (await db.execute(select(func.count(Lead.id)).where(Lead.status == "new"))).scalar() or 0
    total_quotes = (await db.execute(func.count(QuoteRequest.id))).scalar() or 0

    recent_leads_result = await db.execute(select(Lead).order_by(Lead.created_at.desc()).limit(10))
    recent_quotes_result = await db.execute(select(QuoteRequest).order_by(QuoteRequest.created_at.desc()).limit(10))

    metrics = DashboardMetrics(
        total_leads=total_leads,
        new_leads=new_leads,
        total_quotes=total_quotes,
        recent_leads=[LeadOut.model_validate(l) for l in recent_leads_result.scalars().all()],
        recent_quotes=[QuoteOut.model_validate(q) for q in recent_quotes_result.scalars().all()],
    )

    await redis_client.setex("dashboard_metrics", 300, metrics.model_dump_json())
    return metrics
