import { getProducts } from '@/lib/database';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Bienestar - Impatto Py',
  description: 'Productos para tu salud y bienestar.',
};

// La página ahora es ASÍNCRONA para poder conectarse a la base de datos
export default async function BienestarPage() {
  
  // 1. Obtenemos todos los productos desde Supabase
  const allProducts = await getProducts();

  // 2. Filtramos los productos para esta categoría (tu lógica de keyword se mantiene)
  const keyword = 'Masajeador';
  const bienestarProducts = allProducts.filter((p: Product) => 
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  // 3. Pasamos los productos filtrados al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Bienestar</h1>
        </header>
        <ShopPageClient products={bienestarProducts} />
    </div>
  );
}