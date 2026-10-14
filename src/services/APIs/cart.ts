import api from "../axios";

export const addToCart = async (data: {
  event_type_id: number;
  event_id: number;
  plan_id: number;
  quantity: number;
}) => {
  return api.post("/cart/add", data);
};

export const getCart = async () => {
  return api.get("/cart/summary");
};

export const updateCart = async (plan_id: number, quantity: number) => {
  return api.post("/cart/update", {
    plan_id: String(plan_id),
    quantity: String(quantity),
  });
};

export const removeItem = async (plan_id: number) => {
  return api.post("/cart/remove", {
    plan_id: String(plan_id),
  });
};

export const applyCoupon = async (coupon_code: string) => {
  return api.post("/cart/apply-coupon", { coupon_code });
};

export const removeCoupon = async (coupon_code: string) => {
  return api.post("/cart/remove-coupon", { coupon_code });
};

export const undoRemoveItem = async () => {
  const res = await api.post("/cart/undo");
  return res.data;
};
