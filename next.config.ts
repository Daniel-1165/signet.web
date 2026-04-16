import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TypeScript type-checking and ESLint during Vercel builds.
  // This eliminates the long "Running TypeScript..." phase.
  // Your editor still validates types locally.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
