import { allProducts, Product } from '@/lib/data'; // Ajusta la ruta a tus datos
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Bienestar - Impatto Py',
  description: 'Productos para tu salud y bienestar.',
};

export default function SaludBienestarPage() {
  // Filtramos productos que contengan 'Masajeador'
  const bienestarProducts = allProducts.filter((p: Product) => 
    p.name.includes('Masajeador')
  );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Bienestar</h1>
        </header>
        <ShopPageClient products={bienestarProducts} />
    </div>
  );
}