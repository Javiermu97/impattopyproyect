import { allProducts, Product } from '@/lib/data';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Soluciones prácticas y novedosas para hacer tu vida más fácil.',
};

export default function HogarPage() {
  // Palabras clave para filtrar productos de esta categoría
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  
  const hogarProducts = allProducts
    .filter((p: Product) => 
      keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
    );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar</h1>
        </header>
        <ShopPageClient products={hogarProducts} />
    </div>
  );
}