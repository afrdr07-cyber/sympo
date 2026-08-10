import os
from typing import Optional
from dotenv import load_dotenv

# Load .env file
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
load_dotenv(env_path)

DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycbzHsjuh3_OhNxIf0uOAJJwyU4K5aU8o48GSyOUMymzc80Lpt2zQ-AJ--caAPSHEWLEhYw/exec"

try:
    from pydantic_settings import BaseSettings, SettingsConfigDict

    class Settings(BaseSettings):
        PROJECT_NAME: str = "AI NEXUS 2026 - P.S.V CET AI & DS Symposium API"
        API_V1_STR: str = "/api/v1"
        SECRET_KEY: str = os.getenv("SECRET_KEY", "psv_aids_symposium_super_secret_key_change_in_production")
        ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
        ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

        ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
        ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "psvaids2026password")

        PAYMENT_MODE: str = os.getenv("PAYMENT_MODE", "PLACEHOLDER")
        CASHFREE_APP_ID: str = os.getenv("CASHFREE_APP_ID", "placeholder_app_id")
        CASHFREE_SECRET_KEY: str = os.getenv("CASHFREE_SECRET_KEY", "placeholder_secret_key")
        CASHFREE_ENV: str = os.getenv("CASHFREE_ENV", "TEST")

        @property
        def GOOGLE_APPS_SCRIPT_URL(self) -> str:
            raw = os.getenv("GOOGLE_APPS_SCRIPT_URL")
            val = str(raw or "").strip()
            if not val or not val.startswith("http") or "YOUR_" in val:
                return DEFAULT_GAS_URL
            return val

        model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    settings = Settings()

except Exception as e:
    class FallbackSettings:
        PROJECT_NAME: str = os.getenv("PROJECT_NAME", "P.S.V College AI & DS Symposium 2026 API")
        API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")
        SECRET_KEY: str = os.getenv("SECRET_KEY", "psv_aids_symposium_super_secret_key_change_in_production")
        ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
        ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

        ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
        ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "psvaids2026password")

        PAYMENT_MODE: str = os.getenv("PAYMENT_MODE", "PLACEHOLDER")
        CASHFREE_APP_ID: str = os.getenv("CASHFREE_APP_ID", "placeholder_app_id")
        CASHFREE_SECRET_KEY: str = os.getenv("CASHFREE_SECRET_KEY", "placeholder_secret_key")
        CASHFREE_ENV: str = os.getenv("CASHFREE_ENV", "TEST")

        @property
        def GOOGLE_APPS_SCRIPT_URL(self) -> str:
            raw = os.getenv("GOOGLE_APPS_SCRIPT_URL")
            val = str(raw or "").strip()
            if not val or not val.startswith("http") or "YOUR_" in val:
                return DEFAULT_GAS_URL
            return val

    settings = FallbackSettings()



