import { getProducts } from '@/lib/database';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Mecánica & Más - Impatto Py',
  description: 'Accesorios y herramientas para tu vehículo.',
};

// La página ahora es ASÍNCRONA para poder conectarse a la base de datos
export default async function MecanicaPage() {
  
  // 1. Obtenemos todos los productos desde Supabase
  const allProducts = await getProducts();

  // 2. Filtramos los productos para esta categoría (tu lógica de keywords se mantiene)
  const keywords = ['Solar Charger', 'Vehiculo'];
  const mecanicaProducts = allProducts.filter((p: Product) => 
    keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
  );

  // 3. Pasamos los productos filtrados al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Mecánica & Más</h1>
        </header>
        <ShopPageClient products={mecanicaProducts} />
    </div>
  );
}