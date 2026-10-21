import type { Metadata } from "next";

import PaymentSuccessClient from "./PaymentSuccessClient";

export const metadata: Metadata = {
  title: "Payment Successful – The Grand Masters 2026",
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessClient />;
}
