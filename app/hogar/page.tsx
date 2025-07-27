import { getProducts } from '@/lib/database';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Soluciones prácticas y novedosas para hacer tu vida más fácil.',
};

// La página ahora es ASÍNCRONA para poder conectarse a la base de datos
export default async function HogarPage() {
  
  // 1. Obtenemos todos los productos desde Supabase
  const allProducts = await getProducts();

  // 2. Filtramos los productos para esta categoría (tu lógica de keywords se mantiene)
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  const hogarProducts = allProducts
    .filter((p: Product) => 
      keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
    );

  // 3. Pasamos los productos filtrados al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar</h1>
        </header>
        <ShopPageClient products={hogarProducts} />
    </div>
  );
}