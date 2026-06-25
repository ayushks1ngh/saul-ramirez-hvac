# Learn This First — Backend Engineering Guide

A practical guide to every backend concept used in this project.

---

## 1. FastAPI Fundamentals

FastAPI is a Python web framework that turns functions into HTTP endpoints using decorators.

```python
@app.get("/api/health")
async def health():
    return {"status": "ok"}
```

Key concepts:
- **Decorators** (`@app.get`, `@app.post`) map URLs to functions
- **Async/await** — functions can be `async`, allowing non-blocking I/O
- **Dependency injection** — `Depends()` injects database sessions, auth checks, etc.
- **Automatic docs** — FastAPI generates OpenAPI docs at `/docs`

The `Depends()` system is the backbone: when you write `db: AsyncSession = Depends(get_db)`, FastAPI calls `get_db()` for you, gives you a database session, and cleans it up after the request.

---

## 2. SQLAlchemy Fundamentals

SQLAlchemy is an ORM (Object-Relational Mapper). Instead of writing SQL, you define Python classes that map to database tables.

```python
class Lead(Base):
    __tablename__ = "leads"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
```

Key operations:
- `db.add(obj)` — Stage an INSERT
- `await db.commit()` — Write to database
- `await db.execute(select(Lead))` — Run a SELECT query
- `result.scalars().all()` — Get Python objects from query result

**Async SQLAlchemy** uses `asyncpg` under the hood — queries don't block other requests.

---

## 3. PostgreSQL Concepts

PostgreSQL is a relational database. Data lives in tables with typed columns.

Key concepts for this project:
- **Primary keys** — Unique identifier for each row (we use UUIDs)
- **Indexes** — Speed up WHERE/ORDER BY queries. Created on columns you filter often (status, created_at)
- **Transactions** — `commit()` makes changes permanent, `rollback()` undoes them
- **Connection pooling** — SQLAlchemy maintains a pool of connections to avoid reconnecting per request

Why PostgreSQL over SQLite:
- Concurrent writes (multiple API requests simultaneously)
- Proper data types (TIMESTAMP WITH TIMEZONE)
- Production-grade durability and performance

---

## 4. Redis Concepts

Redis is an in-memory data store. It's fast because everything lives in RAM.

We use it for two purposes:

**Caching** (GET/SET with TTL):
```python
await redis.setex("dashboard_metrics", 300, json_data)  # Cache for 5 min
cached = await redis.get("dashboard_metrics")            # Check cache first
await redis.delete("dashboard_metrics")                  # Invalidate on change
```

**Job Queue** (LPUSH/BRPOP):
```python
await redis.lpush("email_queue", json_payload)   # Producer: add job
result = await redis.brpop("email_queue", 5)     # Consumer: wait for job
```

`BRPOP` is a **blocking pop** — the worker sleeps until a job arrives. This is efficient: no polling, no CPU waste.

---

## 5. Background Jobs

Why background jobs? You don't want to send an email inside an API request — it's slow and if it fails, the user sees an error even though their data was saved.

Pattern:
1. API saves data + queues a job (fast, ~10ms)
2. Worker picks up the job later (can take seconds, can retry)
3. User gets instant response

In this project:
- **Producer**: `email_service.py` → pushes to Redis
- **Consumer**: `email_worker.py` → pops from Redis, processes, updates DB

This is the same pattern used by Celery, Sidekiq, and Bull — just simpler.

---

## 6. Async APIs

Python `async`/`await` lets one process handle thousands of concurrent requests.

Without async: Request A waits for database → thread blocked → need more threads.
With async: Request A waits for database → event loop handles Request B → one thread serves many requests.

In this project:
- `async def create_lead(...)` — Handler is async
- `await db.commit()` — Yields control while waiting for PostgreSQL
- `await redis.lpush(...)` — Yields control while waiting for Redis

FastAPI + uvicorn use an event loop (like Node.js) to multiplex I/O.

---

## 7. OpenAPI

OpenAPI is a spec that describes your API in a machine-readable format. FastAPI generates it automatically from:
- Route decorators (paths, methods)
- Pydantic models (request/response schemas)
- Type hints (parameter types)

Visit `http://localhost:8000/docs` to see:
- Every endpoint with try-it-out buttons
- Request/response schemas
- Validation rules

This replaces manual API documentation and ensures docs are always accurate.

---

## 8. Request Lifecycle

What happens when a user submits the quote form:

```
Browser                    Nginx             FastAPI              PostgreSQL    Redis
   │ POST /api/leads         │                  │                     │          │
   │───────────────────────▶│                  │                     │          │
   │                         │ proxy_pass       │                     │          │
   │                         │────────────────▶│                     │          │
   │                         │                  │ Pydantic validates   │          │
   │                         │                  │ INSERT lead          │          │
   │                         │                  │────────────────────▶│          │
   │                         │                  │ INSERT email_job     │          │
   │                         │                  │────────────────────▶│          │
   │                         │                  │ LPUSH email_queue    │          │
   │                         │                  │───────────────────────────────▶│
   │                         │                  │ COMMIT               │          │
   │                         │                  │────────────────────▶│          │
   │                         │  201 Created     │                     │          │
   │◀────────────────────────│◀────────────────│                     │          │
```

Later, the worker:
```
Worker                     Redis              PostgreSQL
   │ BRPOP email_queue       │                  │
   │───────────────────────▶│                  │
   │ (blocks until job)      │                  │
   │◀───────────────────────│                  │
   │ [mock] send email       │                  │
   │ UPDATE email_jobs       │                  │
   │────────────────────────────────────────── ▶│
```

---

## 9. How Caching Works

Problem: The dashboard queries COUNT(*) on every request — expensive with many rows.

Solution: Cache the result in Redis with a TTL (time-to-live).

```python
# 1. Check cache
cached = await redis.get("dashboard_metrics")
if cached:
    return cached  # Fast path — no DB query

# 2. Cache miss — query DB
metrics = ... # expensive queries

# 3. Store in cache for 5 minutes
await redis.setex("dashboard_metrics", 300, metrics)

# 4. Invalidate when data changes
await redis.delete("dashboard_metrics")  # Called after lead/quote creation
```

Trade-off: Dashboard data can be up to 5 minutes stale. For a small HVAC business, this is fine.

---

## 10. How Deployment Works

Docker Compose orchestrates multiple containers:

```yaml
services:
  postgres:    # Database — persists to a volume
  redis:       # Cache/queue — persists to a volume
  backend:     # FastAPI app — depends on postgres + redis
  worker:      # Same image as backend, different command
  frontend:    # Nginx serving built React app
```

**Why containers?**
- Same environment everywhere (dev = staging = prod)
- One command to start everything: `docker compose up`
- Health checks ensure services start in order
- Volumes persist data across restarts

**The frontend Dockerfile** has two stages:
1. **Build stage**: Node.js installs deps + runs `vite build`
2. **Runtime stage**: Nginx serves the static files (~20MB image vs ~1GB with Node)

**The backend Dockerfile**: Python + pip install + uvicorn.

---

## Putting It All Together

This stack is the industry standard for Python web services:

1. User fills form → React sends POST to `/api/leads`
2. Nginx proxies to FastAPI
3. Pydantic validates the payload (rejects bad data with 422)
4. SQLAlchemy inserts into PostgreSQL (async, non-blocking)
5. Email job is queued in Redis
6. Response returned to user (~50ms total)
7. Worker picks up job, "sends" email, marks complete

Every piece is independently scalable:
- Slow on writes? Add more backend instances
- Queue backing up? Add more workers
- Database slow? Add read replicas or indexes
- Frontend slow? CDN the static assets
