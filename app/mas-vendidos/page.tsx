import { getProducts } from '@/lib/database';
import ShopPageClient from '@/app/components/ShopPageClient';
import { Product } from '@/lib/types';

export const metadata = {
  title: 'Más Vendidos - Impatto Py',
  description: 'Descubre nuestros productos más populares y en tendencia.',
};

// La página ahora es ASÍNCRONA para poder conectarse a la base de datos
export default async function MasVendidosPage() {
  
  // 1. Obtenemos todos los productos desde Supabase
  const allProducts = await getProducts();

  // 2. Ordenamos los productos por fecha de creación (el más nuevo primero)
  //    Ya no filtramos por 'inStock' porque ese dato no viene de la base de datos.
  const bestSellers = allProducts.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // 3. Pasamos la lista ordenada de productos al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Más Vendidos</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Aquí encontrarás los productos favoritos de nuestra comunidad.
            </p>
        </header>
        <ShopPageClient products={bestSellers} />
    </div>
  );
}