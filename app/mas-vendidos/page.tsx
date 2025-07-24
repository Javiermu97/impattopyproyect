// app/mas-vendidos/page.tsx
import { allProducts } from '@/lib/data';
import ProductCard from '@/app/components/ProductCard';

export const metadata = {
  title: 'Más Vendidos - Arcashop PY',
  description: 'Descubre nuestros productos más populares y en tendencia.',
};

export default function MasVendidosPage() {
  // Obtenemos todos los productos en stock y los ordenamos por fecha de añadido
  const bestSellers = allProducts
    .filter(p => p.inStock)
    .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Más Vendidos</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Aquí encontrarás los productos favoritos de nuestra comunidad.
        </p>
      </header>

      <main className="shop-layout">
        {/* Aquí podrías añadir filtros en el futuro si quisieras */}
        <aside className="filters-sidebar">
           <h3 className="filter-title-main">Filtros</h3>
           <p>Próximamente...</p>
        </aside>

        <div className="product-grid-area">
          {/* Usamos la clase 'columns-3' para la grilla principal */}
          <div className="product-grid-shop columns-3">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}