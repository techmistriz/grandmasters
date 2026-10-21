import type { Metadata } from "next";

import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Cart – The Grand Masters 2026",
};

export default function CartPage() {
  return <CartClient />;
}
