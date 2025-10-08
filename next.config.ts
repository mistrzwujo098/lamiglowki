import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [50, 75, 95],
  },
  // Suppress workspace root warnings for Cloudflare Pages
  outputFileTracingRoot: undefined,
};

export default nextConfig;
