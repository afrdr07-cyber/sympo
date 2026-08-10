import httpx
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from app.config import settings

class GoogleSheetsService:
    def __init__(self):
        self.gas_url = settings.GOOGLE_APPS_SCRIPT_URL

    async def _send_request(self, method: str, payload: Optional[Dict[str, Any]] = None, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        if not self.gas_url or "AKfycbwYOUR_MOCK_GAS_DEPLOYMENT_ID" in self.gas_url:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Google Sheets database service is not configured yet. Please set GOOGLE_APPS_SCRIPT_URL in backend .env to your deployed Apps Script URL."
            )

        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as client:
            try:
                if method.upper() == "POST":
                    response = await client.post(self.gas_url, json=payload)
                else:
                    response = await client.get(self.gas_url, params=params)

                if response.status_code != 200:
                    raise HTTPException(
                        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                        detail=f"Google Sheets service error (HTTP {response.status_code}). Please try again later."
                    )
                
                try:
                    result = response.json()
                except Exception:
                    raise HTTPException(
                        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                        detail=f"Invalid response from Google Sheets service: {response.text[:200]}"
                    )

                if isinstance(result, dict) and not result.get("success", False) and "error" in result:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=result.get("error", "Database operation failed")
                    )
                return result if isinstance(result, dict) else {"success": True, "raw": result}

            except HTTPException:
                raise
            except httpx.RequestError as exc:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=f"Unable to connect to Google Sheets backend database service: {str(exc)}"
                )

    async def save_registration(self, registration_data: Dict[str, Any]) -> Dict[str, Any]:
        payload = {
            "action": "REGISTER",
            "payload": registration_data
        }
        return await self._send_request("POST", payload=payload)

    async def get_all_registrations(self) -> Dict[str, Any]:
        return await self._send_request("GET", params={"action": "GET_ALL"})

    async def get_stats(self) -> Dict[str, Any]:
        return await self._send_request("GET", params={"action": "GET_STATS"})

    async def get_registration_by_id(self, reg_id: str) -> Dict[str, Any]:
        return await self._send_request("GET", params={"action": "GET_BY_ID", "regId": reg_id})

    async def update_status(self, reg_id: str, status: Optional[str], payment_status: Optional[str]) -> Dict[str, Any]:
        payload = {
            "action": "UPDATE_STATUS",
            "payload": {
                "registrationId": reg_id,
                "status": status,
                "paymentStatus": payment_status
            }
        }
        return await self._send_request("POST", payload=payload)

    async def delete_registration(self, reg_id: str) -> Dict[str, Any]:
        payload = {
            "action": "DELETE_REGISTRATION",
            "payload": {"registrationId": reg_id}
        }
        return await self._send_request("POST", payload=payload)

    async def update_registration(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        req_payload = {
            "action": "UPDATE_REGISTRATION",
            "payload": payload
        }
        return await self._send_request("POST", payload=req_payload)

sheets_service = GoogleSheetsService()
