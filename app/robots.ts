import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',      // Bloquea el panel de administración
        '/api',        // Bloquea las rutas de datos internos
        '/_next',      // Bloquea archivos internos de Next.js
      ],
    },
    sitemap: 'https://impatto.com.py/sitemap.xml',
  }
}