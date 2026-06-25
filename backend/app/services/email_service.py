import json
import uuid
from datetime import datetime, timezone

from app.db.redis import redis_client
from app.models.models import EmailJob
from sqlalchemy.ext.asyncio import AsyncSession


async def enqueue_email(db: AsyncSession, recipient: str, subject: str) -> str:
    """Create an email job record and push to Redis queue."""
    job = EmailJob(id=str(uuid.uuid4()), recipient=recipient, subject=subject)
    db.add(job)
    await db.flush()

    payload = json.dumps({
        "job_id": job.id,
        "recipient": recipient,
        "subject": subject,
        "queued_at": datetime.now(timezone.utc).isoformat(),
    })
    await redis_client.lpush("email_queue", payload)
    return job.id
