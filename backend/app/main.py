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


# Include API Routers (No Admin Router)
app.include_router(events.router, prefix=settings.API_V1_STR)
app.include_router(registration.router, prefix=settings.API_V1_STR)
app.include_router(payment.router, prefix=settings.API_V1_STR)
app.include_router(receipt.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "department": "Artificial Intelligence & Data Science",
        "college": "P.S.V College of Engineering & Technology",
        "version": "1.0.0",
        "database": "Google Sheets (via Apps Script Web App)",
        "paymentMode": settings.PAYMENT_MODE
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": f"Internal Server Error: {str(exc)}"}
    )
