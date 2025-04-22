from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Application settings
    APP_NAME: str = "Budg"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str
    REDIS_PASSWORD: str
    
    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost", "http://localhost:80"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings() 