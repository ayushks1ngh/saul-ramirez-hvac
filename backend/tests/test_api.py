import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport

from app.main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.mark.anyio
async def test_health(client: AsyncClient):
    res = await client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


@pytest.mark.anyio
@patch("app.api.leads.redis_client", new_callable=AsyncMock)
@patch("app.services.email_service.redis_client", new_callable=AsyncMock)
async def test_create_lead(mock_email_redis, mock_leads_redis, client: AsyncClient):
    mock_leads_redis.delete = AsyncMock()
    mock_email_redis.lpush = AsyncMock()
    res = await client.post("/api/leads", json={
        "name": "John Doe",
        "phone": "4691234567",
        "email": "john@example.com",
        "service": "AC Repair",
        "message": "My AC is broken",
    })
    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "John Doe"
    assert data["status"] == "new"
    assert "id" in data


@pytest.mark.anyio
async def test_create_lead_validation(client: AsyncClient):
    res = await client.post("/api/leads", json={
        "name": "",
        "phone": "123",
        "email": "invalid",
        "service": "",
    })
    assert res.status_code == 422


@pytest.mark.anyio
@patch("app.api.quotes.redis_client", new_callable=AsyncMock)
@patch("app.services.email_service.redis_client", new_callable=AsyncMock)
async def test_create_quote(mock_email_redis, mock_quotes_redis, client: AsyncClient):
    mock_quotes_redis.delete = AsyncMock()
    mock_email_redis.lpush = AsyncMock()
    res = await client.post("/api/quotes", json={
        "name": "Jane Smith",
        "phone": "4699876543",
        "email": "jane@example.com",
        "property_type": "Residential",
        "requested_service": "AC Installation",
        "notes": "Need new unit",
    })
    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "Jane Smith"
    assert data["requested_service"] == "AC Installation"
