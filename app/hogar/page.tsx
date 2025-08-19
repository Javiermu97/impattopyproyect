// Importamos las herramientas necesarias
import { supabase } from '@/lib/supabaseClient'; 

import ShopPageClient from '@/app/components/ShopPageClient';

// Metadata de la página
export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Soluciones prácticas y novedosas para hacer tu vida más fácil.',
};

export default async function HogarPage() {
  
  const { data: hogarProducts, error } = await supabase
    .from('productos')
    .select('*') 
    .ilike('categoria', '%Hogar%'); // <-- ¡AQUÍ ESTÁ LA CORRECCIÓN FINAL!

  if (error) {
    console.error('Error al cargar productos de la categoría Hogar:', error);
  }

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar</h1>
            
        </header>

        {/* Muestra un mensaje si la consulta no devuelve productos */}
        {(!hogarProducts || hogarProducts.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {/* Solo muestra el componente de la tienda si hay productos */}
        {hogarProducts && hogarProducts.length > 0 && (
          <ShopPageClient products={hogarProducts} />
        )}
    </div>
  );
}