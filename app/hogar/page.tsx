import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Soluciones y artículos para tu hogar.',
};

export default async function HogarPage() {
  // Buscamos "Hogar" en la base de datos
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Hogar%');

  if (error) {
    console.error('Error al cargar productos de Hogar:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar</h1>
        </header>

        {(!products || products.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {products && products.length > 0 && (
          <ShopPageClient products={products} />
        )}
    </div>
  );
}