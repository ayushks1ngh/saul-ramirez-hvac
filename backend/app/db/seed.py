from sqlalchemy import select

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import async_session
from app.models.models import User


async def seed_admin():
    """Create default admin user if it doesn't exist."""
    async with async_session() as db:
        result = await db.execute(select(User).where(User.email == settings.ADMIN_EMAIL))
        if result.scalar_one_or_none() is None:
            admin = User(
                email=settings.ADMIN_EMAIL,
                password_hash=hash_password(settings.ADMIN_PASSWORD),
                role="admin",
            )
            db.add(admin)
            await db.commit()
