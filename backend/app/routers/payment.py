from fastapi import APIRouter
from app.schemas.payment import (
    CreateOrderRequest, CreateOrderResponse, VerifyPaymentRequest, VerifyPaymentResponse
)
from app.services.payment_service import payment_service

router = APIRouter(prefix="/payment", tags=["Payment Plug & Play"])

@router.post("/create-order", response_model=CreateOrderResponse)
async def create_payment_order(payload: CreateOrderRequest):
    """
    Cashfree Gateway Order Generation Endpoint (Placeholder Mode).
    Prepares payment session for checkout.
    """
    res = await payment_service.create_order(
        registration_id=payload.registrationId,
        amount=payload.amount,
        customer_email=payload.customerEmail,
        customer_phone=payload.customerPhone,
        customer_name=payload.customerName
    )
    return CreateOrderResponse(**res)

@router.post("/verify", response_model=VerifyPaymentResponse)
async def verify_payment_status(payload: VerifyPaymentRequest):
    """
    Cashfree Signature & Webhook Verification Endpoint.
    """
    res = await payment_service.verify_payment(
        order_id=payload.orderId,
        payment_id=payload.paymentId,
        signature=payload.signature,
        upi_transaction_id=payload.upiTransactionId,
        screenshot_url=payload.screenshotUrl
    )
    return VerifyPaymentResponse(**res)

@router.get("/status/{order_id}")
async def get_payment_status(order_id: str):
    """
    Query Cashfree Payment Status by Order ID.
    """
    return await payment_service.get_payment_status(order_id)
