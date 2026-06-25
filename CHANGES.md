# Changes

## 2026-06-20 — Full-Stack Implementation

### Backend Created
- `backend/app/main.py` — FastAPI application with CORS, lifespan, exception handler
- `backend/app/core/config.py` — Pydantic settings from environment variables
- `backend/app/core/security.py` — bcrypt hashing + JWT token creation
- `backend/app/models/models.py` — SQLAlchemy models: User, Lead, QuoteRequest, EmailJob
- `backend/app/schemas/schemas.py` — Pydantic request/response schemas with validation
- `backend/app/api/leads.py` — CRUD endpoints for leads
- `backend/app/api/quotes.py` — Create/list endpoints for quotes
- `backend/app/api/auth.py` — Login endpoint returning JWT
- `backend/app/api/dashboard.py` — Admin metrics with Redis caching
- `backend/app/api/health.py` — Health check endpoint
- `backend/app/services/email_service.py` — Queue email jobs to Redis
- `backend/app/workers/email_worker.py` — Background worker processing email queue
- `backend/app/db/session.py` — Async SQLAlchemy engine + session
- `backend/app/db/redis.py` — Redis async client
- `backend/app/db/seed.py` — Admin user seeder
- `backend/app/middleware/auth.py` — JWT auth dependency
- `backend/requirements.txt` — Python dependencies
- `backend/Dockerfile` — Backend container
- `backend/.env.example` — Environment template
- `backend/tests/test_api.py` — API integration tests
- `backend/pytest.ini` — Test config

### Frontend Modified
- `src/lib/api.ts` — New API client module
- `src/components/QuoteForm.tsx` — Connected to backend with loading/error states
- `src/pages/Admin.tsx` — New admin dashboard with login, metrics, tables, search, filtering
- `src/App.tsx` — Added admin route, separated Layout component
- `src/test/QuoteForm.test.tsx` — New form tests (3 tests)
- `src/test/App.test.tsx` — New routing tests (2 tests)
- Removed `src/test/example.test.ts` (placeholder)

### Infrastructure
- `docker-compose.yml` — 5 services: frontend, backend, worker, postgres, redis
- `Dockerfile` — Frontend multi-stage build (Node → Nginx)
- `nginx.conf` — SPA routing + API reverse proxy
- `.env.development` — Vite env for local backend URL

### Fixes
- `tailwind.config.ts` — `require()` → ESM import
- `src/components/ui/command.tsx` — Empty interface → type alias
- `src/components/ui/textarea.tsx` — Empty interface → type alias
- `src/components/EmergencyBanner.tsx` — Fixed phone number
- `src/components/ServicePageLayout.tsx` — Fixed phone number + brand name
- `src/pages/ServiceAreas.tsx` — Fixed phone number + brand name

### Documentation
- `README.md` — Rewritten for full-stack setup
- `ARCHITECTURE.md` — System design + diagrams
- `DATABASE.md` — Schema reference
- `API.md` — Endpoint documentation
- `BACKGROUND_JOBS.md` — Queue architecture explanation
- `SECURITY.md` — Auth + security model
- `LEARN_THIS_FIRST.md` — Backend engineering educational guide
- `AUDIT.md` — Quality audit results
- `MANUAL_ACTIONS.md` — Post-deployment checklist
- `CHANGES.md` — This file

### Verification
- ✅ `npm run lint` — 0 errors
- ✅ `npm run build` — successful
- ✅ `npm test` — 5/5 passing
- ✅ `npx tsc --noEmit` — no type errors
