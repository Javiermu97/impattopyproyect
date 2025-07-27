import { allProducts, Product } from '@/lib/data';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Mecánica & Más - Impatto Py',
  description: 'Accesorios y herramientas para tu vehículo.',
};

export default function MecanicaPage() {
  // Palabras clave para filtrar productos de esta categoría
  const keywords = ['Solar Charger', 'Vehiculo']; // Puedes añadir más
  
  const mecanicaProducts = allProducts.filter((p: Product) => 
    keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
  );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Mecánica & Más</h1>
        </header>
        <ShopPageClient products={mecanicaProducts} />
    </div>
  );
}