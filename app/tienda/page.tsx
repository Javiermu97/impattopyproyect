// Ubicación: app/tienda/page.tsx
export const dynamic = 'force-dynamic';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ShopPageClient from '../components/ShopPageClient';
import { Product } from '@/lib/types';
import { transformProducts } from '@/lib/imageUtils';

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

  // Transformar URLs antes de devolver
  return transformProducts(data) as Product[];
}

export const revalidate = 300; 

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <div className="shop-container">
      <ShopPageClient products={products} />
    </div>
  );
}