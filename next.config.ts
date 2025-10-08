import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [50, 75, 95],
  },
};

export default nextConfig;
