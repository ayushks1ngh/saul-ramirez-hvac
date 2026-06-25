# Architecture

## System Overview

```
┌─────────────┐     ┌──────────────┐     ┌────────────┐
│   Frontend  │────▶│   Backend    │────▶│ PostgreSQL │
│  (React/    │     │  (FastAPI)   │     │            │
│   Nginx)    │     │              │────▶│   Redis    │
└─────────────┘     └──────────────┘     └────────────┘
      :3000               :8000              :5432/:6379
                          │
                    ┌─────┴──────┐
                    │   Worker   │
                    │ (email_    │
                    │  worker)   │
                    └────────────┘
```

## Services

| Service | Port | Purpose |
|---------|------|---------|
| frontend | 3000 | React SPA served by Nginx, proxies `/api` to backend |
| backend | 8000 | FastAPI REST API |
| worker | — | Background job processor (email queue) |
| postgres | 5432 | Persistent data store |
| redis | 6379 | Cache + job queue |

## Request Flow

1. Browser hits `http://localhost:3000`
2. Nginx serves the SPA for all non-`/api` routes
3. `/api` requests are proxied to the backend at `:8000`
4. Backend validates with Pydantic, persists to PostgreSQL via SQLAlchemy
5. Background jobs are pushed to Redis queue
6. Worker process pops jobs from Redis and processes them

## Frontend Architecture

```
src/
├── main.tsx              # Entry
├── App.tsx               # Router + providers
├── lib/api.ts            # API client (fetch wrapper)
├── components/           # Shared UI (Navbar, Footer, QuoteForm)
│   └── ui/               # shadcn/ui primitives
├── pages/                # Route-level components
│   ├── Index.tsx         # Homepage
│   ├── Admin.tsx         # Protected admin dashboard
│   ├── AC*.tsx           # Service pages
│   └── ...
└── test/                 # Vitest tests
```

## Backend Architecture

```
backend/
├── app/
│   ├── main.py           # FastAPI app, lifespan, CORS, routes
│   ├── core/
│   │   ├── config.py     # Pydantic settings (env vars)
│   │   └── security.py   # JWT + bcrypt utilities
│   ├── api/
│   │   ├── leads.py      # CRUD for leads
│   │   ├── quotes.py     # Create/list quotes
│   │   ├── auth.py       # Login endpoint
│   │   ├── dashboard.py  # Admin metrics (cached)
│   │   └── health.py     # Health check
│   ├── models/models.py  # SQLAlchemy ORM models
│   ├── schemas/schemas.py# Pydantic validation schemas
│   ├── services/         # Business logic (email queueing)
│   ├── workers/          # Background job processors
│   ├── db/
│   │   ├── session.py    # Engine + session factory
│   │   ├── redis.py      # Redis client
│   │   └── seed.py       # Admin user seeding
│   └── middleware/
│       └── auth.py       # JWT auth dependency
├── tests/                # pytest tests
├── Dockerfile
└── requirements.txt
```

## Key Design Decisions

1. **Auto-migration on startup**: Tables are created via `Base.metadata.create_all` in the lifespan handler. For production, use Alembic.
2. **Redis dual-use**: Serves as both cache (dashboard metrics TTL=300s) and job queue (LPUSH/BRPOP pattern).
3. **Separate worker process**: Decouples email sending from request handling. The worker is a long-running `asyncio` loop.
4. **JWT auth**: Stateless authentication — token stored in localStorage on the frontend.
5. **Nginx reverse proxy**: In Docker, Nginx serves the SPA and proxies `/api` to backend, eliminating CORS in production.
