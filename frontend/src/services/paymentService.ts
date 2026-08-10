import api from './api';

export interface CreateOrderPayload {
  registrationId: string;
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
}

export interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  paymentSessionId: string;
  status: string;
  mode: string;
}

export const paymentService = {
  /**
   * Generates a payment order session.
   * Currently invokes backend Google Pay QR endpoint.
   * Ready for Cashfree SDK JS trigger!
   */
  async createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
    const res = await api.post<OrderResponse>('/payment/create-order', payload);
    return res.data;
  },

  async verifyPayment(orderId: string, paymentId?: string, signature?: string, upiTransactionId?: string, screenshotUrl?: string) {
    const res = await api.post('/payment/verify', {
      orderId,
      paymentId,
      signature,
      upiTransactionId,
      screenshotUrl
    });
    return res.data;
  },

  async getPaymentStatus(orderId: string) {
    const res = await api.get(`/payment/status/${orderId}`);
    return res.data;
  }
};
