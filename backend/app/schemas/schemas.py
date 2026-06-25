from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# --- Leads ---
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    service: str = Field(..., min_length=1, max_length=100)
    message: Optional[str] = Field(None, max_length=1000)


class LeadUpdate(BaseModel):
    status: str = Field(..., pattern="^(new|contacted|qualified|converted|closed)$")


class LeadOut(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    service: str
    message: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# --- Quotes ---
class QuoteCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    property_type: str = Field(..., min_length=1, max_length=50)
    requested_service: str = Field(..., min_length=1, max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)


class QuoteOut(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    property_type: str
    requested_service: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# --- Auth ---
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- Dashboard ---
class DashboardMetrics(BaseModel):
    total_leads: int
    new_leads: int
    total_quotes: int
    recent_leads: list[LeadOut]
    recent_quotes: list[QuoteOut]
