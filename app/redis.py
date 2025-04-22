import redis
from app.config import get_settings

settings = get_settings()

# Create Redis connection
redis_client = redis.Redis(
    host=settings.REDIS_URL.split("://")[1].split(":")[0],
    port=int(settings.REDIS_URL.split("://")[1].split(":")[1].split("/")[0]),
    db=0,
    password=settings.REDIS_PASSWORD,
    decode_responses=True
)

def get_redis():
    return redis_client 