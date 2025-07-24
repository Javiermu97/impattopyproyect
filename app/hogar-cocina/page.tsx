// app/hogar-cocina/page.tsx
import { allProducts } from '@/lib/data';
import ProductCard from '@/app/components/ProductCard';

export const metadata = {
  title: 'Hogar & Cocina - Arcashop PY',
  description: 'Encuentra todo lo que necesitas para tu hogar y cocina.',
};

export default function HogarCocinaPage() {
  // Filtramos los productos por palabras clave, como hicimos en la página de inicio
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  const hogarCocinaProducts = allProducts
    .filter(p => keywords.some(key => p.name.includes(key)));

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Hogar & Cocina</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Soluciones prácticas y novedosas para hacer tu vida más fácil.
        </p>
      </header>
      
      <main className="shop-layout">
        <aside className="filters-sidebar">
           <h3 className="filter-title-main">Filtros</h3>
           <p>Próximamente...</p>
        </aside>

        <div className="product-grid-area">
          <div className="product-grid-shop columns-3">
            {hogarCocinaProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}