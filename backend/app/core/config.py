from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://hvac_user:hvac_pass@localhost:5432/hvac_db"
    REDIS_URL: str = "redis://localhost:6379/0"
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ADMIN_EMAIL: str = "admin@saulramirezhvac.com"
    ADMIN_PASSWORD: str = "changeme123"

    class Config:
        env_file = ".env"


settings = Settings()
