// Ubicación: app/tienda/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ShopPageClient from '../components/ShopPageClient';
import { Product } from '@/lib/types';

// Definimos un tipo para la forma en que vienen las características de la BD
interface CaracteristicaFromDB {
  id: number;
  titulo: string;
  Descripción: string; // Con mayúscula y tilde
  imagen: string;
  // ...cualquier otra propiedad que tenga
}

async function getProducts() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('productos')
    .select('*, caracteristicas(*)');

  if (error) {
    console.error('Error al cargar los productos y sus características:', error);
    return [];
  }

  const products = data.map(p => ({
    id: p.id,
    name: p.nombre,
    price: p.precio,
    oldPrice: p.precio_antiguo,
    inStock: p['en stock'],
    created_at: p.creado_en,
    imageUrl: p['URL de la imagen'],
    imageUrl2: p['URL de la imagen2'],
    galleryImages: p['Galería de imágenes'],
    categorias: p.categorias,
    texto_oferta: p.texto_oferta,
    description: p.descripcion,
    // ✅ CORREGIDO: Usamos el tipo CaracteristicaFromDB en lugar de 'any'
    caracteristicas: p.caracteristicas.map((c: CaracteristicaFromDB) => ({
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