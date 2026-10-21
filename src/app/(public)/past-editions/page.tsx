import type { Metadata } from "next";

import PastEditionsClient from "./PastEditionsClient";

export const metadata: Metadata = {
  title: "Past Editions – The Grand Masters",
};

export default function PastEditionsPage() {
  return <PastEditionsClient />;
}
