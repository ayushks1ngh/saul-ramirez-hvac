# API Reference

Base URL: `http://localhost:8000`  
OpenAPI docs: `http://localhost:8000/docs`

## Public Endpoints

### POST /api/leads

Create a new lead (form submission from website).

**Request:**
```json
{
  "name": "John Doe",
  "phone": "4691234567",
  "email": "john@example.com",
  "service": "AC Repair",
  "message": "My AC stopped working"
}
```

**Validation:**
- `name`: 1–100 chars, required
- `phone`: 7–20 chars, required
- `email`: valid email, required
- `service`: 1–100 chars, required
- `message`: 0–1000 chars, optional

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "John Doe",
  "phone": "4691234567",
  "email": "john@example.com",
  "service": "AC Repair",
  "message": "My AC stopped working",
  "status": "new",
  "created_at": "2026-06-20T12:00:00Z"
}
```

### POST /api/quotes

Create a quote request.

**Request:**
```json
{
  "name": "Jane Smith",
  "phone": "4699876543",
  "email": "jane@example.com",
  "property_type": "Residential",
  "requested_service": "AC Installation",
  "notes": "Need a new unit for 2000 sqft home"
}
```

**Response:** `201 Created`

### GET /api/health

**Response:** `200 OK`
```json
{ "status": "ok" }
```

## Admin Endpoints

### POST /api/auth/login

**Request:**
```json
{
  "email": "admin@saulramirezhvac.com",
  "password": "changeme123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

### GET /api/leads

Query params: `status`, `search`, `skip`, `limit`

**Response:** `200 OK` — Array of Lead objects

### GET /api/leads/{id}

**Response:** `200 OK` — Single Lead object

### PATCH /api/leads/{id}

**Request:**
```json
{ "status": "contacted" }
```

Valid statuses: `new`, `contacted`, `qualified`, `converted`, `closed`

**Response:** `200 OK` — Updated Lead object

### GET /api/quotes

Query params: `skip`, `limit`

**Response:** `200 OK` — Array of QuoteRequest objects

### GET /api/admin/dashboard

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "total_leads": 42,
  "new_leads": 5,
  "total_quotes": 18,
  "recent_leads": [...],
  "recent_quotes": [...]
}
```

Cached in Redis for 5 minutes. Cache invalidated on new lead/quote creation or status update.

## Error Responses

All errors return:
```json
{ "detail": "Error message" }
```

| Status | Meaning |
|--------|---------|
| 401 | Invalid/missing auth token |
| 404 | Resource not found |
| 422 | Validation error (Pydantic) |
| 500 | Internal server error |
