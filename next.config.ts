import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL },
  images: {
    domains: [
      "www.blissworld.com",
      "cdn.shopify.com",
      "cdn.pixabay.com",
      "via.placeholder.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
