// Ubicación: app/tienda/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ShopPageClient from '../components/ShopPageClient';
import { Product } from '@/lib/types';

async function getProducts() {
  const supabase = createServerComponentClient({ cookies });
  
  // Consulta que pide todas las columnas necesarias, incluyendo la tabla relacionada
  const { data, error } = await supabase
    .from('productos')
    .select('*, caracteristicas(*)');

  if (error) {
    console.error('Error al cargar los productos y sus características:', error);
    return [];
  }

  // Mapeamos los nombres para que coincidan 100% con el tipo 'Product'
  const products = data.map(p => ({
    id: p.id,
    name: p.nombre,
    price: p.precio,
    oldPrice: p.precio_antiguo,
    inStock: p['inStock'],
    created_at: p.creado_en, // ✅ CORREGIDO: de 'createdAt' a 'created_at'
    imageUrl: p['URL de la imagen'],
    imageUrl2: p['URL de la imagen2'],
    galleryImages: p['Galería de imágenes'],
    categorias: p.categorias,
    texto_oferta: p.texto_oferta,
    description: p.descripcion,
    caracteristicas: p.caracteristicas.map((c: any) => ({
      ...c,
      descripcion: c.Descripción 
    })),
  }));

  return products as Product[];
}

export default async function TiendaPage() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}