import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import RecaptchaProvider from "@/src/components/providers/RecaptchaProvider";
import { siteConfig } from "@/src/config/site.config";

const shareDescription =
  "Join India's leading Corporate Counsel Legal Best Practices Summit Series.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Grand Masters 2026",
    "Corporate Counsel Summit",
    "Legal Summit India",
    "General Counsel",
    "In-House Counsel",
    "Lex Witness",
    "Legal Conference",
  ],
  authors: [{ name: "Lex Witness" }],
  icons: {
    icon: "/images/lwLogo.jpg",
  },

  openGraph: {
    title: siteConfig.title,
    description: shareDescription,
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: shareDescription,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" data-scroll-behavior="smooth">
      <body>
        <RecaptchaProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="bottom-right" />
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
