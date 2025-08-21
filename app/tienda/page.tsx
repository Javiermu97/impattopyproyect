// Ubicación: app/tienda/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ShopPageClient from '../components/ShopPageClient';
import { Product } from '@/lib/types';

// Función para obtener TODOS los productos con los nombres de columna correctos
async function getProducts() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('productos')
    .select('*'); // No necesitamos traer las características en la página de tienda principal

  if (error) {
    console.error('Error al cargar los productos:', error);
    return [];
  }

  // No necesitamos un mapeo complejo aquí si los nombres en el tipo Product coinciden
  // con la base de datos (ej: name, price, imageUrl, etc.)
  return data as Product[];
}

export const revalidate = 300; // Importante: Para que la tienda se actualice con nuevos productos

export default async function TiendaPage() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}