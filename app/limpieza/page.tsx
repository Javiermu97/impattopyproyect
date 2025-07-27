import { getProducts } from '@/lib/database';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Limpieza - Impatto Py',
  description: 'Soluciones de limpieza para tu hogar.',
};

// La página ahora es ASÍNCRONA para poder conectarse a la base de datos
export default async function LimpiezaPage() {
  
  // 1. Obtenemos todos los productos desde Supabase
  const allProducts = await getProducts();

  // 2. Filtramos los productos para esta categoría (tu lógica de keywords se mantiene)
  const keywords = ['Lint', 'Cinta', 'Cepillo', 'Absorbente', 'Quita Pelusas'];
  const limpiezaProducts = allProducts.filter((p: Product) => 
    keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
  );

  // 3. Pasamos los productos filtrados al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Limpieza</h1>
        </header>
        <ShopPageClient products={limpiezaProducts} />
    </div>
  );
}