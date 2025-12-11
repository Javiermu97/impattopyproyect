import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Baño - Impatto Py',
  description: 'Accesorios y productos para tu baño.',
};

export default async function BanoPage() {
  
  // Buscamos "Baño"
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Baño%');

  if (error) {
    console.error('Error al cargar productos de Baño:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Baño</h1>
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