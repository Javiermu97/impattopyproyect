// Importamos las herramientas necesarias
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

// Metadata de la página
export const metadata = {
  title: 'Limpieza - Impatto Py',
  description: 'Artículos y soluciones para mantener tu hogar y espacios impecables.',
};

export default async function LimpiezaPage() {
  
  const { data: limpiezaProducts, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Limpieza%');

  if (error) {
    console.error('Error al cargar productos de la categoría Limpieza:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Limpieza</h1>
        </header>

        {/* Muestra un mensaje si la consulta no devuelve productos */}
        {(!limpiezaProducts || limpiezaProducts.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {/* Solo muestra el componente de la tienda si hay productos */}
        {limpiezaProducts && limpiezaProducts.length > 0 && (
          <ShopPageClient products={limpiezaProducts} />
        )}
    </div>
  );
}