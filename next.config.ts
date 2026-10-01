import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.1.51"],
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
