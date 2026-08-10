from pydantic import BaseModel
from typing import Optional

class CreateOrderRequest(BaseModel):
    registrationId: str
    amount: float
    customerEmail: str
    customerPhone: str
    customerName: str

class CreateOrderResponse(BaseModel):
    orderId: str
    amount: float
    currency: str = "INR"
    paymentSessionId: str
    status: str = "ACTIVE"
    mode: str = "GOOGLE_PAY_QR"

class VerifyPaymentRequest(BaseModel):
    orderId: str
    paymentId: Optional[str] = "MOCK_PAYMENT_123"
    signature: Optional[str] = "MOCK_SIGNATURE"
    upiTransactionId: Optional[str] = None
    screenshotUrl: Optional[str] = None

class VerifyPaymentResponse(BaseModel):
    orderId: str
    paymentId: str
    status: str
    message: str
    upiTransactionId: Optional[str] = None
    screenshotUrl: Optional[str] = None
