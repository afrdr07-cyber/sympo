import sys
import os

# Add backend directory to sys.path
backend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    from app.main import app
except Exception as init_err:
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    app = FastAPI(title="Error Fallback")
    
    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    async def catch_all_error(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": "Backend Initialization Exception",
                "detail": str(init_err),
                "type": type(init_err).__name__
            }
        )



