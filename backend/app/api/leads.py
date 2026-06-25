from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.db.redis import redis_client
from app.models.models import Lead
from app.schemas.schemas import LeadCreate, LeadOut, LeadUpdate
from app.services.email_service import enqueue_email

router = APIRouter(prefix="/api/leads", tags=["Leads"])


@router.post("", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
async def create_lead(data: LeadCreate, db: AsyncSession = Depends(get_db)):
    lead = Lead(**data.model_dump())
    db.add(lead)
    await enqueue_email(db, data.email, f"Thanks for contacting Saul Ramirez Heating & A/C — {data.service}")
    await db.commit()
    await db.refresh(lead)
    await redis_client.delete("dashboard_metrics")
    return lead


@router.get("", response_model=list[LeadOut])
async def list_leads(
    status_filter: str | None = Query(None, alias="status"),
    search: str | None = None,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    q = select(Lead).order_by(Lead.created_at.desc())
    if status_filter:
        q = q.where(Lead.status == status_filter)
    if search:
        q = q.where(Lead.name.ilike(f"%{search}%") | Lead.email.ilike(f"%{search}%"))
    q = q.offset(skip).limit(limit)
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/{lead_id}", response_model=LeadOut)
async def get_lead(lead_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.patch("/{lead_id}", response_model=LeadOut)
async def update_lead(lead_id: str, data: LeadUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    lead.status = data.status
    await db.commit()
    await db.refresh(lead)
    await redis_client.delete("dashboard_metrics")
    return lead
