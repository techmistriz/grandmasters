import type { Metadata } from "next";

import OfficialMessageClient from "./OfficialMessageClient";

export const metadata: Metadata = {
  title: "Official Messages – The Grand Masters 2026",
};

export default function OfficialMessagePage() {
  return <OfficialMessageClient />;
}
