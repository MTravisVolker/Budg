from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI(
    title="Budg API",
    description="API for Budg - A web-based budgeting application",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(GZipMiddleware, minimum_size=1000)

@app.get("/health")
async def health_check():
    """Health check endpoint for Docker and monitoring."""
    return {"status": "healthy"}

@app.get("/")
async def root():
    """Root endpoint that redirects to the API documentation."""
    return {"message": "Welcome to Budg API. Visit /api/docs for documentation."} 