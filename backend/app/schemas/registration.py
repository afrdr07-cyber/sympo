from pydantic import BaseModel, Field
from typing import List, Optional

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

class ParticipantInfo(BaseModel):
    fullName: str = Field(..., min_length=2, description="Participant Full Name")
    email: str = Field(..., pattern=EMAIL_REGEX, description="Participant Email Address")
    mobileNumber: str = Field(..., min_length=10, max_length=10, description="10-digit mobile number")
    collegeName: str = Field(..., min_length=3, description="College / Institution Name")
    department: str = Field(..., min_length=2, description="Department")
    year: str = Field(..., description="Academic Year (e.g. I, II, III, IV)")

class SelectedEventDetails(BaseModel):
    eventId: str
    eventName: str
    category: str
    fee: float = 150.0

    preferredLanguage: Optional[str] = None
    teamName: Optional[str] = None
    teamLeaderName: Optional[str] = None
    presentationTitle: Optional[str] = None
    abstractUrl: Optional[str] = None
    teamSize: Optional[int] = 1
    cameraType: Optional[str] = None
    campusDeclaration: Optional[bool] = False
    captainName: Optional[str] = None
    freeFireUid: Optional[str] = None
    inGameName: Optional[str] = None
    teamPosition: Optional[str] = None

class PaymentInfo(BaseModel):
    orderId: str
    paymentId: Optional[str] = "MOCK_PAYMENT_SUCCESS"
    paymentMethod: Optional[str] = "GOOGLE_PAY_QR"
    status: str = "SUCCESS"
    transactionRef: Optional[str] = None
    upiTransactionId: Optional[str] = None
    screenshotUrl: Optional[str] = None

class RegistrationSubmissionRequest(BaseModel):
    participant: ParticipantInfo
    selectedEvents: List[SelectedEventDetails]
    payment: Optional[PaymentInfo] = None

class RegistrationResponse(BaseModel):
    success: bool
    registrationId: str
    message: str
    totalAmount: float
    receiptUrl: str
    participant: ParticipantInfo
    selectedEvents: List[SelectedEventDetails]
    payment: PaymentInfo
