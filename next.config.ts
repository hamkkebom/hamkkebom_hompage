import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["resend"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
