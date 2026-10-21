import type { Metadata } from "next";

import EditionOverviewClient from "./EditionOverviewClient";

export const metadata: Metadata = {
  title: "Edition Overview – The Grand Masters",
};

export default function EditionOverviewPage() {
  return <EditionOverviewClient />;
}
