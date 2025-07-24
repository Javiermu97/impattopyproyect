// app/(mas-vendidos)/page.tsx
import { allProducts, Product } from '@/lib/data';
import ProductCard from '@/app/components/ProductCard';
import FiltersSidebar from '@/app/components/FiltersSidebar';

export const metadata = {
  title: 'Más Vendidos - Impatto Py',
  description: 'Descubre nuestros productos más populares y en tendencia.',
};

export default function MasVendidosPage() {
  // Obtenemos todos los productos en stock y los ordenamos por fecha de añadido
  const bestSellers = allProducts
    .filter((p: Product) => p.inStock)
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
        {/* Usamos el componente de filtros reutilizable */}
        <FiltersSidebar />

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