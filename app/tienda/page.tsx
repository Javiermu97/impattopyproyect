// Ubicación: app/tienda/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ShopPageClient from '../components/ShopPageClient';
import { Product } from '@/lib/types';

// Función para obtener TODOS los productos
async function getProducts() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('productos')
    .select('*'); 

  if (error) {
    console.error('Error al cargar los productos:', error);
    return [];
  }

  return data as Product[];
}

export const revalidate = 300; 

export default async function TiendaPage() {
  const products = await getProducts();

  // Envuelve tu componente cliente en el div con la clase "shop-container"
  // para aplicar los márgenes laterales y el espacio inferior.
  return (
    <div className="shop-container">
      <ShopPageClient products={products} />
    </div>
  );
}