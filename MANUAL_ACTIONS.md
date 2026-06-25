# Manual Actions Required

No blocking manual actions. Everything runs with `docker compose up --build`.

## Optional Post-Deployment Actions

1. **Change the admin password** after first login at `/admin`
2. **Set a real `SECRET_KEY`** in production:
   ```bash
   openssl rand -hex 32
   ```
   Update `backend/.env` or your deployment secrets.

3. **Run `npm audit fix`** if you want to resolve dev dependency vulnerabilities (no production risk)

4. **Set up Alembic** for database migrations if schema will evolve:
   ```bash
   cd backend && alembic init alembic
   ```

5. **Configure real email sending** in `app/workers/email_worker.py` — replace the mock with SMTP/SendGrid/SES integration

6. **Add HTTPS** in production via reverse proxy (Traefik, Caddy, or cloud load balancer)
