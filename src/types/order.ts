export type AttendeePayload = {
  attendee_name: string;
  attendee_email: string;
  attendee_phone: string;
  attendee_company: string;
  attendee_designation: string;
};

export type RegisterOrderPayload = {
  full_name: string;
  email: string;
  phone: string;
  firm_name: string;
  gst_number: string;
  message: string;
  address: string;
  city_id: string;
  state_id: string;
  country_id: string;
  pincode: string;
  attendees: AttendeePayload[];
};

export type AttendeeFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
};

export interface RegisterOrderResponse {
  data: {
    razorpay_key: string;
    amount: number;
    currency: string;
    razorpay_order_id: string;
    order_number: string;
    user: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

export interface PaymentData {
  order_number: string;
  order_id: string;
  transaction_id: string;
  payment_status: string;
  payment_amount: number | string;
  gateway_order_id: string;
}

export interface LocationOption {
  id: number;
  name: string;
}
