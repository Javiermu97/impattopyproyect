import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'tu-proyecto.supabase.co' // Reemplaza con tu URL de Supabase (ej: oyuiopxvncdyjrpfaeki.supabase.co)
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;