import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routers import events, registration, payment, receipt

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for React Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Uploads directory static serving
is_vercel = os.getenv("VERCEL") == "1" or os.getenv("VERCEL_ENV") is not None
UPLOAD_DIR = "/tmp/uploads" if is_vercel else os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
try:
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
except Exception as e:
    print(f"Notice: Static upload directory initialization: {e}")


# Include API Routers across prefixes for Vercel rewrite compatibility
for pfx in [settings.API_V1_STR, "/v1", ""]:
    app.include_router(events.router, prefix=pfx)
    app.include_router(registration.router, prefix=pfx)
    app.include_router(payment.router, prefix=pfx)
    app.include_router(receipt.router, prefix=pfx)


@app.get("/")
@app.get("/api/v1/health")
@app.get("/api/health")
@app.get("/health")
async def root(request: Request = None):
    req_path = request.url.path if request else "unknown"
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "department": "Artificial Intelligence & Data Science",
        "college": "P.S.V College of Engineering & Technology",
        "version": "1.0.0",
        "path": req_path,
        "database": "Google Sheets (via Apps Script Web App)",
        "paymentMode": settings.PAYMENT_MODE
    }


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": f"Internal Server Error: {str(exc)}"}
    )

@app.api_route("/{catch_all:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
async def catch_all_debug(request: Request, catch_all: str):
    return {
        "debug": True,
        "catch_all": catch_all,
        "url_path": request.url.path,
        "scope_path": request.scope.get("path"),
        "headers": {k.decode("utf-8", "ignore"): v.decode("utf-8", "ignore") for k, v in request.scope.get("headers", [])}
    }

