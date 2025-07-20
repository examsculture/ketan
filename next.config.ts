import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore all ESLint errors during Vercel build
  },
};

export default nextConfig;
