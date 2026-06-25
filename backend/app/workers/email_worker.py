"""Background worker that processes the email queue from Redis."""
import asyncio
import json
import logging

from sqlalchemy import update

from app.db.session import async_session
from app.db.redis import redis_client
from app.models.models import EmailJob

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("worker")


async def process_email(payload: dict):
    """Mock email sending — in production, integrate with SMTP/SendGrid/SES."""
    logger.info(f"[MOCK] Sending email to {payload['recipient']}: {payload['subject']}")
    await asyncio.sleep(0.5)  # Simulate network delay

    async with async_session() as db:
        await db.execute(
            update(EmailJob).where(EmailJob.id == payload["job_id"]).values(status="sent")
        )
        await db.commit()
    logger.info(f"[MOCK] Email job {payload['job_id']} marked as sent")


async def run_worker():
    """Long-running loop that pops jobs from Redis queue."""
    logger.info("Worker started — listening on email_queue")
    while True:
        result = await redis_client.brpop("email_queue", timeout=5)
        if result:
            _, raw = result
            payload = json.loads(raw)
            try:
                await process_email(payload)
            except Exception as e:
                logger.error(f"Failed to process job: {e}")
                # Re-queue on failure
                await redis_client.lpush("email_queue", json.dumps(payload))


if __name__ == "__main__":
    asyncio.run(run_worker())
