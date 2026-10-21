import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  experimental: {
    cpus: Number(process.env.NEXT_BUILD_CPUS) || undefined,
  },

  images: {
    // Disables local server image proxy during dev mode so localhost/http image loading works without canvas errors
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "events.lexwitness.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/lex-witness-events/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/lex-witness-events/uploads/**",
      },
    ],
  },
};

export default nextConfig;
