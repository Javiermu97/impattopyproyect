import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Electrónica - Impatto Py',
  description: 'Productos electrónicos y accesorios tecnológicos.',
};

export default async function ElectronicaPage() {

  const { data: electronicaProducts, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Electrónica%');

  if (error) {
    console.error('Error al cargar productos de la categoría Electrónica:', error);
  }

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Electrónica</h1>
      </header>

      {(!electronicaProducts || electronicaProducts.length === 0) && (
        <div className="product-grid-area">
          <p className="no-products-message">
            No se encontraron productos para esta categoría.
          </p>
        </div>
      )}

      {electronicaProducts && electronicaProducts.length > 0 && (
        <ShopPageClient products={electronicaProducts} />
      )}
    </div>
  );
}