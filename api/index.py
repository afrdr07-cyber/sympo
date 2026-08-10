import sys
import os

# Ensure api directory, root directory, and backend directory are in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
backend_dir = os.path.join(parent_dir, "backend")

for path in [current_dir, parent_dir, backend_dir]:
    if path not in sys.path:
        sys.path.insert(0, path)

from app.main import app as fastapi_app

# Vercel ASGI path unwrapper
async def app(scope, receive, send):
    if scope.get("type") == "http":
        headers = dict(scope.get("headers", []))
        raw_uri = headers.get(b"x-forwarded-uri", b"").decode("utf-8") or headers.get(b"x-matched-path", b"").decode("utf-8")
        if raw_uri and raw_uri.startswith("/"):
            clean_path = raw_uri.split("?")[0]
            if clean_path:
                scope["path"] = clean_path
    await fastapi_app(scope, receive, send)
