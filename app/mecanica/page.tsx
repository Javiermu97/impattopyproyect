// Importamos las herramientas necesarias
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

// Metadata de la página
export const metadata = {
  title: 'Mecánica - Impatto Py',
  description: 'Herramientas y accesorios para el mantenimiento de tu vehículo.',
};

export default async function MecanicaPage() {
  
  const { data: mecanicaProducts, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Mecanica%');

  if (error) {
    console.error('Error al cargar productos de la categoría Mecánica:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Mecánica</h1>
        </header>

        {/* Muestra un mensaje si la consulta no devuelve productos */}
        {(!mecanicaProducts || mecanicaProducts.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {/* Solo muestra el componente de la tienda si hay productos */}
        {mecanicaProducts && mecanicaProducts.length > 0 && (
          <ShopPageClient products={mecanicaProducts} />
        )}
    </div>
  );
}