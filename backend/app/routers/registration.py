import os
import uuid
import base64
import httpx
from fastapi import APIRouter, HTTPException, status, UploadFile, File
from app.schemas.registration import RegistrationSubmissionRequest, RegistrationResponse
from app.services.registration_service import registration_service
from app.config import settings

router = APIRouter(prefix="/registration", tags=["Registration"])

ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"]

@router.post("/submit", response_model=RegistrationResponse)
async def submit_registration(payload: RegistrationSubmissionRequest):
    """
    Process symposium registration:
    1. Validates event rules & combinations.
    2. Verifies payment completion & screenshot/UPI status.
    3. Saves record directly to Google Sheets.
    4. Returns confirmation payload with direct receipt download URL.
    """
    return await registration_service.process_registration(payload)

@router.post("/upload-abstract")
async def upload_abstract(file: UploadFile = File(...)):
    """
    Validates and stores PDF abstract uploads for Paper Presentation.
    """
    if not file.filename.endswith(".pdf") and file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed for paper presentation abstracts."
        )

    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Abstract file size exceeds maximum allowed limit of 5MB."
        )

    filename = f"ABSTRACT_{uuid.uuid4().hex[:8]}_{file.filename}"
    upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    filepath = os.path.join(upload_dir, filename)

    with open(filepath, "wb") as f:
        f.write(contents)

    return {
        "success": True,
        "filename": filename,
        "url": f"/uploads/{filename}",
        "message": "Abstract PDF uploaded successfully"
    }

@router.post("/upload-screenshot")
async def upload_payment_screenshot(file: UploadFile = File(...)):
    """
    Upload Payment Screenshot Image to Google Drive:
    - Validates file format: Only JPG, JPEG, PNG are allowed.
    - Validates file size: Maximum 5MB.
    - Uploads directly to Google Drive folder "Symposium Payment Screenshots".
    - Returns official Google Drive View URL: https://drive.google.com/file/d/FILE_ID/view
    - NO local server path fallback allowed. If upload fails, registration is blocked.
    """
    if file.content_type not in ALLOWED_IMAGE_TYPES and not any(file.filename.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image format. Only JPG, JPEG, and PNG files are allowed for payment screenshots."
        )

    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Screenshot file size exceeds maximum allowed limit of 5MB."
        )

    # Encode file content to Base64
    base64_data = base64.b64encode(contents).decode('utf-8')
    unique_filename = f"PAYMENT_{uuid.uuid4().hex[:8].upper()}_{file.filename}"

    # Forward to Google Apps Script Drive API
    apps_script_url = settings.GOOGLE_APPS_SCRIPT_URL
    if not apps_script_url or "YOUR_DEPLOYMENT_ID" in apps_script_url:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google Apps Script URL is not configured. Google Drive upload unavailable."
        )

    drive_payload = {
        "action": "UPLOAD_DRIVE_SCREENSHOT",
        "payload": {
            "filename": unique_filename,
            "mimeType": file.content_type or "image/jpeg",
            "base64Data": base64_data
        }
    }

    try:
        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as client:
            response = await client.post(apps_script_url, json=drive_payload)
            res_json = response.json()

            if not res_json.get("success", False) or "driveUrl" not in res_json:
                error_msg = res_json.get("error", "Google Drive screenshot upload failed.")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Google Drive Screenshot Upload Failed: {error_msg}. Please retry your upload."
                )

            return {
                "success": True,
                "fileId": res_json.get("fileId"),
                "driveUrl": res_json["driveUrl"],
                "filename": unique_filename,
                "message": "Payment screenshot stored permanently in Google Drive"
            }

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to connect to Google Drive service: {str(exc)}. Please retry your screenshot upload."
        )
