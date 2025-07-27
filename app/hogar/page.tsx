import { allProducts, Product } from '@/lib/data';
import ShopPageClient from '../components/ShopPageClient';

export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Encuentra todo lo que necesitas para tu hogar y cocina.',
};

export default function HogarPage() {
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  
  // La única línea que cambiamos es la siguiente:
  const hogarProducts = allProducts
    .filter((p: Product) => 
      keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
    );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Soluciones prácticas y novedosas para hacer tu vida más fácil.
            </p>
        </header>
        <ShopPageClient products={hogarProducts} />
    </div>
  );
}