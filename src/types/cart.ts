export interface CartItem {
  id?: number;
  plan_id: number;
  plan_name: string;
  price: number;
  quantity: number;
}

export interface CartCoupon {
  id?: number;
  code: string;
  discount_type?: number;
  amount?: string;
}

export interface CartData {
  event_type_id?: number;
  event_id?: number;
  items: CartItem[];
  coupon: CartCoupon | null;
  discount: number;
  subtotal: number;
  gst_percent: number;
  gst_amount: number;
  total: number;
}

export interface CartResponse {
  status: boolean;
  data?: CartData;
  message: string;
}
