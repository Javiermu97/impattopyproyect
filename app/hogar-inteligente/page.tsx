import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: 'Hogar Inteligente - Impatto Py',
  description: 'Tecnología y domótica para tu hogar.',
};

export default async function HogarInteligentePage() {
  
  // Buscamos "Inteligente" para abarcar "Hogar Inteligente" o "Casa Inteligente"
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Inteligente%');

  if (error) {
    console.error('Error al cargar productos de Hogar Inteligente:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar Inteligente</h1>
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