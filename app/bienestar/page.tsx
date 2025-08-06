// Importamos las herramientas necesarias
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

// Metadata de la página
export const metadata = {
  title: 'Bienestar - Impatto Py',
  description: 'Encuentra productos para tu cuidado personal, salud y bienestar.',
};

export default async function BienestarPage() {
  
  const { data: bienestarProducts, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Bienestar%');

  if (error) {
    console.error('Error al cargar productos de la categoría Bienestar:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Bienestar</h1>
        </header>

        {/* Muestra un mensaje si la consulta no devuelve productos */}
        {(!bienestarProducts || bienestarProducts.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {/* Solo muestra el componente de la tienda si hay productos */}
        {bienestarProducts && bienestarProducts.length > 0 && (
          <ShopPageClient products={bienestarProducts} />
        )}
    </div>
  );
}