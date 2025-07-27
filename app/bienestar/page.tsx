import { allProducts, Product } from '@/lib/data';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Bienestar - Impatto Py',
  description: 'Productos para tu salud y bienestar.',
};

export default function BienestarPage() {
  // Palabra clave para filtrar productos de esta categoría
  const keyword = 'Masajeador';
  
  const bienestarProducts = allProducts.filter((p: Product) => 
    p.name.toLowerCase().includes(keyword.toLowerCase())
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