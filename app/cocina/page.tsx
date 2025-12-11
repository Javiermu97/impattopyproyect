import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Cocina - Impatto Py',
  description: 'Utensilios y accesorios para equipar tu cocina.',
};

export default async function CocinaPage() {
  
  // Buscamos productos que contengan la palabra "Cocina" en su categoría
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Cocina%');

  if (error) {
    console.error('Error al cargar productos de Cocina:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Cocina</h1>
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