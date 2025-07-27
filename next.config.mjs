// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // ▼▼▼ REEMPLAZA ESTO con el hostname de tu bucket de Supabase ▼▼▼
        hostname: 'xxxxxx.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/images/**', // Ajusta si tu ruta es diferente
      },
    ],
  },
};

export default nextConfig;