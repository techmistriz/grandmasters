import type { Metadata } from "next";

import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout – The Grand Masters 2026",
  description: "Complete your ticket purchase securely",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
