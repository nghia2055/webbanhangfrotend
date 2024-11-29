import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.blissworld.com", "cdn.shopify.com", "cdn.pixabay.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
