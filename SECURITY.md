# Security Model

## Authentication

- **Method**: JWT (JSON Web Tokens) via `python-jose`
- **Storage**: Token stored in `localStorage` on the frontend
- **Expiry**: 60 minutes (configurable via `ACCESS_TOKEN_EXPIRE_MINUTES`)
- **Algorithm**: HS256

## Password Handling

- **Hashing**: bcrypt via `passlib`
- **Never stored in plaintext**
- Default admin password should be changed immediately in production

## Protected Routes

| Endpoint | Auth Required |
|----------|--------------|
| POST /api/leads | No (public form) |
| POST /api/quotes | No (public form) |
| GET /api/health | No |
| GET /api/leads | No (could be protected) |
| PATCH /api/leads/{id} | No (should be protected in production) |
| GET /api/admin/dashboard | Yes (Bearer token) |
| POST /api/auth/login | No |

## CORS

Configured to allow:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Docker frontend)

In production, restrict to your actual domain.

## Input Validation

All inputs are validated by Pydantic schemas:
- Email format validation
- String length limits (prevents abuse)
- Enum validation for status fields
- Required field enforcement

## Environment Secrets

All secrets are in environment variables (never committed):
- `SECRET_KEY` — JWT signing key
- `DATABASE_URL` — Database credentials
- `ADMIN_PASSWORD` — Initial admin password

## Production Recommendations

1. **Change `SECRET_KEY`**: Generate with `openssl rand -hex 32`
2. **Change admin password** after first login
3. **Add rate limiting** to public endpoints (e.g., `slowapi`)
4. **Add HTTPS** via reverse proxy (Traefik, Caddy, or cloud LB)
5. **Protect all admin endpoints** with the auth dependency
6. **Move tokens to httpOnly cookies** to prevent XSS token theft
7. **Add CSRF protection** if using cookies
8. **Rotate JWT signing keys** periodically
