# Saul Ramirez Heating & A/C

Business website for Saul Ramirez Heating & A/C — Dallas-Fort Worth HVAC services.

## Live Site

Deploy the frontend to [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/saul-ramirez-hvac)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL 16 |
| Cache/Queue | Redis 7 |
| Deployment | Vercel (frontend), Docker Compose (full stack) |

## Development

```bash
npm install
npm run dev          # http://localhost:5173
```

### With Backend (Docker)

```bash
docker compose up --build

# Frontend:  http://localhost:3000
# Backend:   http://localhost:8000
# API Docs:  http://localhost:8000/docs
```

Default admin: `admin@saulramirezhvac.com` / `changeme123`

## Scripts

```bash
npm run dev       # Dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
npm test          # Run tests
```

## Deployment

### Vercel (Frontend Only)

1. Push to GitHub
2. Import in Vercel dashboard
3. Framework preset: Vite
4. Deploy — done

The `vercel.json` handles SPA routing automatically.

### Full Stack (Docker)

```bash
docker compose up --build -d
```

Set real secrets in `backend/.env`:
```
SECRET_KEY=<openssl rand -hex 32>
ADMIN_PASSWORD=<strong password>
```

## Project Structure

```
├── src/
│   ├── components/     # Shared UI components
│   ├── pages/          # Route pages
│   ├── lib/            # API client, utilities
│   └── test/           # Vitest tests
├── backend/            # FastAPI application
│   ├── app/api/        # Route handlers
│   ├── app/models/     # SQLAlchemy models
│   ├── app/schemas/    # Pydantic validation
│   └── app/workers/    # Background jobs
├── vercel.json         # Vercel SPA config
└── docker-compose.yml  # Full-stack deployment
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [API.md](./API.md) — Backend endpoints
- [DATABASE.md](./DATABASE.md) — Schema reference
- [SECURITY.md](./SECURITY.md) — Auth model
