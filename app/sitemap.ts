import { MetadataRoute } from 'next'
import { createAuthServerClient } from '@/lib/supabase/auth-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createAuthServerClient();
  
  // Obtenemos los IDs de tus productos para generar las rutas automáticamente
  const { data: productos } = await supabase.from('productos').select('id');

  const productUrls = (productos || []).map((p) => ({
    url: `https://impatto.com.py/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://impatto.com.py',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://impatto.com.py/productos',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Agregamos la ruta de administración para que el buscador sepa que existe pero le daremos prioridad baja
    {
      url: 'https://impatto.com.py/admin',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...productUrls,
  ]
}