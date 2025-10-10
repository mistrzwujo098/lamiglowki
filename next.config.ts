import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/lamiglowki',
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [50, 75, 95],
  },
};

export default nextConfig;
