import { allProducts, Product } from '@/lib/data'; // Asumiendo que tus productos vienen de aquí
import ShopPageClient from '@/app/components/ShopPageClient'; // Importamos el nuevo componente maestro

export const metadata = {
  title: 'Bienestar - Impatto Py',
  description: 'Encuentra todo lo que necesitas para tu hogar y cocina.',
};

export default function BienestarPage() {
  // 1. Pre-filtramos los productos para esta categoría en el servidor
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  const bienestarProducts = allProducts
    .filter((p: Product) => keywords.some(key => p.name.includes(key)));

  // 2. Pasamos solo esa lista de productos al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Bienestar</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Soluciones para mantenerte siempre saludable.
            </p>
        </header>
        <ShopPageClient products={bienestarProducts} />
    </div>
  );
}