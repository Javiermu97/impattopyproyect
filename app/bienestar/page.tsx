import { allProducts, Product } from '@/lib/data';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Bienestar - Impatto Py',
  description: 'Productos para tu salud y bienestar.',
};

export default function BienestarPage() {
  // REVISA AQUÍ: Asegúrate de que la palabra clave exista
  // en los nombres de tus productos en el archivo de datos.
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