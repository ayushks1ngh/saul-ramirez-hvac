# Background Jobs

## Architecture

```
┌──────────┐     LPUSH      ┌───────┐     BRPOP      ┌──────────┐
│  FastAPI  │──────────────▶│ Redis  │◀──────────────│  Worker   │
│  (API)    │               │ Queue  │               │ (Process) │
└──────────┘               └───────┘               └──────────┘
      │                                                    │
      │ INSERT email_jobs                                  │ UPDATE status='sent'
      ▼                                                    ▼
┌──────────────────────────────────────────────────────────┐
│                      PostgreSQL                          │
└──────────────────────────────────────────────────────────┘
```

## How It Works

1. **Trigger**: When a `POST /api/leads` or `POST /api/quotes` request arrives, the API handler:
   - Saves the lead/quote to PostgreSQL
   - Creates an `email_jobs` record with status `queued`
   - Pushes a JSON payload to the `email_queue` Redis list via `LPUSH`

2. **Queue**: Redis list `email_queue` stores JSON payloads:
   ```json
   {
     "job_id": "uuid",
     "recipient": "user@example.com",
     "subject": "Thanks for contacting Saul Ramirez Heating & A/C",
     "queued_at": "2026-06-20T12:00:00Z"
   }
   ```

3. **Worker**: A separate process (`python -m app.workers.email_worker`) runs an infinite loop:
   - Calls `BRPOP email_queue` (blocking pop with 5s timeout)
   - When a job arrives, processes it (mock email send)
   - Updates the `email_jobs` record status to `sent`
   - On failure, re-queues the job via `LPUSH`

## Running the Worker

```bash
# In Docker (automatically started as the 'worker' service)
docker compose up

# Locally
cd backend
python -m app.workers.email_worker
```

## Redis Queue Commands Used

| Command | Purpose |
|---------|---------|
| `LPUSH email_queue <payload>` | Enqueue a job (push to left) |
| `BRPOP email_queue 5` | Dequeue a job (blocking pop from right, FIFO) |

## Reliability

- **At-least-once delivery**: If the worker crashes mid-processing, the job remains in Redis (since `BRPOP` removes it atomically, a crash after pop but before completion means the job is lost). For production, use `BRPOPLPUSH` or Redis Streams.
- **Retry on failure**: If processing throws an exception, the payload is re-pushed to the queue.
- **Idempotency**: The `email_jobs` table tracks status — duplicate sends can be detected.

## Extending

To add more job types:
1. Create a new queue name (e.g., `sms_queue`)
2. Add a service function similar to `enqueue_email`
3. Add a worker loop or extend the existing one to listen on multiple queues

## Monitoring

Check queue length:
```bash
redis-cli LLEN email_queue
```

Check job statuses:
```sql
SELECT status, COUNT(*) FROM email_jobs GROUP BY status;
```
