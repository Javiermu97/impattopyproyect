import { allProducts, Product } from '@/lib/data'; // Asumiendo que tus productos vienen de aquí
import ShopPageClient from '../components/ShopPageClient'; // Importamos el nuevo componente maestro

export const metadata = {
  title: 'Más Vendidos - Impatto Py',
  description: 'Descubre nuestros productos más populares y en tendencia.',
};

export default function MasVendidosPage() {
  // 1. Pre-filtramos los productos para esta categoría en el servidor
  const bestSellers = allProducts
    .filter((p: Product) => p.inStock)
    .sort((a: Product, b: Product) => b.dateAdded.getTime() - a.dateAdded.getTime());

  // 2. Pasamos solo esa lista de productos al componente de cliente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Más Vendidos</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Aquí encontrarás los productos favoritos de nuestra comunidad.
            </p>
        </header>
        <ShopPageClient products={bestSellers} />
    </div>
  );
}