import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Iluminación - Impatto Py',
  description: 'Ilumina tus espacios con la mejor tecnología.',
};

export default async function HogarInteligentePage() {
  // Ahora buscamos "Iluminación" en la base de datos
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Iluminación%');

  if (error) {
    console.error('Error al cargar productos de Iluminación:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Iluminación</h1>
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