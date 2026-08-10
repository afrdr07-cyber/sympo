from pydantic import BaseModel
from typing import Dict, Any, List, Optional

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str

class AdminStatsResponse(BaseModel):
    totalRegistrations: int
    totalRevenue: float
    pendingPayments: int
    eventCounts: Dict[str, int]
    collegeCounts: Dict[str, int]

class UpdateRegistrationStatusRequest(BaseModel):
    registrationId: str
    status: Optional[str] = None
    paymentStatus: Optional[str] = None

class EditParticipantRequest(BaseModel):
    registrationId: str
    fullName: Optional[str] = None
    email: Optional[str] = None
    mobileNumber: Optional[str] = None
    collegeName: Optional[str] = None
    department: Optional[str] = None
    year: Optional[str] = None
