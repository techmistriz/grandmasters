import type { Metadata } from "next";

import SummitSecretariatClient from "./SummitSecretariatClient";

export const metadata: Metadata = {
  title: "Summit Secretariat – The Grand Masters 2026",
};

export default function SummitSecretariatPage() {
  return <SummitSecretariatClient />;
}
