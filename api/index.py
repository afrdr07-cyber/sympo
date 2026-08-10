import sys
import os

# Ensure api directory, root directory, and backend directory are in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
backend_dir = os.path.join(parent_dir, "backend")

for path in [current_dir, parent_dir, backend_dir]:
    if path not in sys.path:
        sys.path.insert(0, path)

from app.main import app
