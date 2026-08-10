import random
import datetime
from typing import Dict, Any
from fastapi import HTTPException, status
from app.schemas.registration import RegistrationSubmissionRequest, RegistrationResponse, PaymentInfo
from app.validation.rules import validate_event_combination, validate_event_specific_fields
from app.services.sheets_service import sheets_service
from app.services.payment_service import payment_service

class RegistrationService:
    @staticmethod
    def generate_registration_id() -> str:
        random_digits = random.randint(10000, 99999)
        return f"PSVAIDS2026-{random_digits}"

    @staticmethod
    def calculate_total_fee(events) -> float:
        # Check if Free Fire is selected
        has_free_fire = any("Free Fire" in e.eventName for e in events)
        if has_free_fire:
            return 150.0  # ₹150 per player
        # General symposium events (1 or 2 events) flat fee = ₹150 total
        return 150.0

    async def process_registration(self, payload: RegistrationSubmissionRequest) -> RegistrationResponse:
        # 1. Validate Event Combination & Rules
        is_valid_combo, combo_msg = validate_event_combination(payload.selectedEvents)
        if not is_valid_combo:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=combo_msg)

        is_valid_fields, fields_msg = validate_event_specific_fields(payload.selectedEvents)
        if not is_valid_fields:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=fields_msg)

        # 2. Strict Payment Verification Check
        payment_info = payload.payment
        if not payment_info or payment_info.status.upper() != "SUCCESS":
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                detail="Payment incomplete or unverified. Registration cannot be saved to Google Sheets without successful payment."
            )

        # 3. Calculate Flat Total Amount (₹150 for general events or ₹150 for Free Fire)
        total_amount = self.calculate_total_fee(payload.selectedEvents)

        # 4. Generate Unique Registration ID
        reg_id = self.generate_registration_id()

        registration_data = {
            "registrationId": reg_id,
            "participant": payload.participant.model_dump(),
            "events": [e.model_dump() for e in payload.selectedEvents],
            "payment": payment_info.model_dump(),
            "totalAmount": total_amount,
            "registrationDate": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }

        # 5. Save ONLY AFTER Successful Payment into Google Sheets
        await sheets_service.save_registration(registration_data)

        receipt_url = f"/api/v1/receipt/{reg_id}"

        return RegistrationResponse(
            success=True,
            registrationId=reg_id,
            message="Registration successfully completed!",
            totalAmount=total_amount,
            receiptUrl=receipt_url,
            participant=payload.participant,
            selectedEvents=payload.selectedEvents,
            payment=payment_info
        )

registration_service = RegistrationService()
