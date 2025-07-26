import { allProducts, Product } from '@/lib/data'; // Ajusta la ruta a tus datos
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Limpieza - Impatto Py',
  description: 'Soluciones de limpieza para tu hogar.',
};

export default function LimpiezaPage() {
  // Filtramos productos por palabras clave de limpieza
  const keywords = ['Lint', 'Cinta', 'Cepillo', 'Absorbente'];
  const limpiezaProducts = allProducts.filter((p: Product) => 
    keywords.some(key => p.name.includes(key))
  );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Limpieza</h1>
        </header>
        <ShopPageClient products={limpiezaProducts} />
    </div>
  );
}