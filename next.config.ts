import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'wghpyqghmrdvlmszghg.supabase.co' // ← Tu Project ID
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wghpyqghmrdvlmszghg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;