import type { CartResponse } from "@/src/types/cart";
import api from "../network/axios";

interface AddToCartData {
  event_type_id: number;
  event_id: number;
  plan_id: number;
  quantity: number;
}

export const addToCart = async (data: AddToCartData) => {
  const res = await api.post("/cart/add", data);
  return res.data;
};

export const getCart = async (): Promise<CartResponse> => {
  const res = await api.get<CartResponse>("/cart/summary");
  return res.data;
};

export const updateCart = async (plan_id: number, quantity: number) => {
  const res = await api.post("/cart/update", {
    plan_id: String(plan_id),
    quantity: String(quantity),
  });
  return res.data;
};

export const removeItem = async (plan_id: number) => {
  const res = await api.post("/cart/remove", {
    plan_id: String(plan_id),
  });
  return res.data;
};

export const applyCoupon = async (coupon_code: string) => {
  const res = await api.post("/cart/apply-coupon", { coupon_code });
  return res.data;
};

export const removeCoupon = async (coupon_code: string) => {
  const res = await api.post("/cart/remove-coupon", { coupon_code });
  return res.data;
};

export const undoRemoveItem = async () => {
  const res = await api.post("/cart/undo");
  return res.data;
};
