import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "www.blissworld.com",
      "cdn.shopify.com",
      "cdn.pixabay.com",
      "via.placeholder.com",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
