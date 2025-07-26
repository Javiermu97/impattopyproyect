import { allProducts, Product } from '@/lib/data'; // Ajusta la ruta a tus datos
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Mecánica & Más - Impatto Py',
  description: 'Accesorios y herramientas para tu vehículo.',
};

export default function VehiculoPage() {
  // Filtramos productos por palabras clave de vehículo/mecánica
  const keywords = ['Solar Charger']; // Puedes añadir más palabras clave
  const vehiculoProducts = allProducts.filter((p: Product) => 
    keywords.some(key => p.name.includes(key))
  );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Mecánica & Más</h1>
        </header>
        <ShopPageClient products={vehiculoProducts} />
    </div>
  );
}