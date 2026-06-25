# Saul Ramirez Heating & A/C — Full-Stack Application

## Quick Start

```bash
# Start all services
docker compose up --build

# Access:
# Frontend:  http://localhost:3000
# Backend:   http://localhost:8000
# API Docs:  http://localhost:8000/docs
# Admin:     http://localhost:3000/admin
```

Default admin credentials:
- Email: `admin@saulramirezhvac.com`
- Password: `changeme123`

## Development (without Docker)

### Frontend
```bash
npm install
npm run dev          # http://localhost:5173
```

### Backend
```bash
cd backend
pip install -r requirements.txt
# Start PostgreSQL and Redis locally first
cp .env.example .env  # Edit DATABASE_URL/REDIS_URL for local
uvicorn app.main:app --reload --port 8000
```

### Background Worker
```bash
cd backend
python -m app.workers.email_worker
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind + shadcn/ui |
| Backend | FastAPI + SQLAlchemy + Pydantic |
| Database | PostgreSQL 16 |
| Cache/Queue | Redis 7 |
| Deployment | Docker Compose |

## Testing

```bash
# Frontend
npm test

# Backend
cd backend && pytest
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [DATABASE.md](./DATABASE.md) — Schema and migrations
- [API.md](./API.md) — Endpoint reference
- [BACKGROUND_JOBS.md](./BACKGROUND_JOBS.md) — Queue architecture
- [SECURITY.md](./SECURITY.md) — Auth and security model
- [LEARN_THIS_FIRST.md](./LEARN_THIS_FIRST.md) — Backend engineering guide
