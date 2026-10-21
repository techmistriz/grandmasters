import api from "../network/axios";
import type {
  PaymentData,
  RegisterOrderPayload,
  RegisterOrderResponse,
} from "../types/order";

export const registerOrder = async (
  payload: RegisterOrderPayload,
): Promise<RegisterOrderResponse> => {
  const res = await api.post("/order/register", payload);
  return res.data;
};

export const verifyPayment = async (payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<{ data?: PaymentData } & Partial<PaymentData>> => {
  const res = await api.post("/order/verify-payment", payload);
  return res.data;
};

export const paymentFail = async (payload: { razorpay_order_id: string }) => {
  const res = await api.post("/payment-fail", payload);
  return res.data;
};
