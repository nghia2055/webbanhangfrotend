import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
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
