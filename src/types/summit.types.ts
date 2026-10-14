export type SummitContentItem = {
  logo?: string;
  title?: string;
  description: string;
};

export type SummitItem = {
  year: string;
  title: string;
  content?: SummitContentItem[];
};

export type CartItem = {
  id: number;
  plan_id: number;
  plan_name: string;
  price: number;
  quantity: number;
};

export type CartCoupon = {
  code: string;
};

export type CartSummary = {
  items: CartItem[];
  subtotal: number;
  discount: number;
  gst_percent: number;
  gst_amount: number;
  total: number;
  coupon: CartCoupon | null;
};

export type CartResponse = {
  data: CartSummary;
};
export type SponsorItem = {
  id: number;
  sponsor_type: string;
  image: string;
  website_url?: string | null;
  title?: string | null;
};

export type SponsorsResponse = {
  data?: {
    margedSponsors?: SponsorItem[];
  };
};
