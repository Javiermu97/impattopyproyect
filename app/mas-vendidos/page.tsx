// app/mas-vendidos/page.tsx
import { allProducts, Product } from '@/lib/data';
// CORRECCIÓN: La ruta ahora debe incluir 'app/'.
import ProductCard from '@/app/components/ProductCard';

export const metadata = {
  title: 'Más Vendidos - Impatto Py',
  description: 'Descubre nuestros productos más populares y en tendencia.',
};

export default function MasVendidosPage() {
  const bestSellers = allProducts
    .filter((p: Product) => p.inStock)
    // CORRECCIÓN: Añadimos tipos a 'a' y 'b' para el sort.
    .sort((a: Product, b: Product) => b.dateAdded.getTime() - a.dateAdded.getTime());

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Más Vendidos</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Aquí encontrarás los productos favoritos de nuestra comunidad.
        </p>
      </header>

      <main className="shop-layout">
        <aside className="filters-sidebar">
            <h3 className="filter-title-main">Filtros</h3>
            <p>Próximamente...</p>
        </aside>

        <div className="product-grid-area">
          <div className="product-grid-shop columns-3">
            {bestSellers.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}