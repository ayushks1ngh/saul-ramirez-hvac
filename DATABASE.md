# Database Schema

## Overview

PostgreSQL 16 with SQLAlchemy async ORM. Tables are auto-created on application startup.

## Tables

### users

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR(36) | PK, UUID |
| email | VARCHAR(255) | UNIQUE, NOT NULL, INDEXED |
| password_hash | VARCHAR(255) | NOT NULL |
| role | VARCHAR(20) | DEFAULT 'admin' |
| created_at | TIMESTAMP WITH TZ | DEFAULT now() |

### leads

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR(36) | PK, UUID |
| name | VARCHAR(100) | NOT NULL |
| phone | VARCHAR(20) | NOT NULL |
| email | VARCHAR(255) | NOT NULL |
| service | VARCHAR(100) | NOT NULL |
| message | TEXT | NULLABLE |
| status | VARCHAR(20) | DEFAULT 'new', INDEXED |
| created_at | TIMESTAMP WITH TZ | DEFAULT now(), INDEXED |

### quote_requests

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR(36) | PK, UUID |
| name | VARCHAR(100) | NOT NULL |
| phone | VARCHAR(20) | NOT NULL |
| email | VARCHAR(255) | NOT NULL |
| property_type | VARCHAR(50) | NOT NULL |
| requested_service | VARCHAR(100) | NOT NULL |
| notes | TEXT | NULLABLE |
| created_at | TIMESTAMP WITH TZ | DEFAULT now(), INDEXED |

### email_jobs

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR(36) | PK, UUID |
| recipient | VARCHAR(255) | NOT NULL |
| subject | VARCHAR(255) | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'queued', INDEXED |
| created_at | TIMESTAMP WITH TZ | DEFAULT now() |

## Indexes

- `ix_users_email` — Fast login lookup
- `ix_leads_status` — Filter leads by status
- `ix_leads_created_at` — Sort leads chronologically
- `ix_quote_requests_created_at` — Sort quotes chronologically
- `ix_email_jobs_status` — Find pending jobs

## Seed Data

On first startup, the application creates a default admin user:
- Email: `admin@saulramirezhvac.com`
- Password: `changeme123`

## Migrations

Tables are auto-created via `Base.metadata.create_all()` during app startup. For production migration management, integrate Alembic:

```bash
cd backend
alembic init alembic
alembic revision --autogenerate -m "initial"
alembic upgrade head
```

## Connection

```
postgresql+asyncpg://hvac_user:hvac_pass@postgres:5432/hvac_db
```

Uses `asyncpg` driver for non-blocking async queries via SQLAlchemy 2.0 async API.
