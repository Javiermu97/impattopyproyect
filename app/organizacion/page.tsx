import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Organización y Decoración - Impatto Py',
  description: 'Soluciones para ordenar y decorar tus espacios.',
};

export default async function OrganizacionPage() {
  
  // Buscamos "Organización"
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Organización%');

  if (error) {
    console.error('Error al cargar productos de Organización:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Organización y Decoración</h1>
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