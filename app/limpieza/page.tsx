import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';
import { transformProducts } from '@/lib/imageUtils';

export const metadata = {
  title: "Limpieza - Impatto Py",
  description: "Productos de limpieza para tu hogar.",
};

export default async function LimpiezaPage() {
  
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Limpieza%');

  if (error) {
    console.error('Error al cargar productos de Limpieza:', error);
  }

  const transformedProducts = transformProducts(products || []);

  return (
    <div className="shop-container limpieza-page"> {/* ← Agregada la clase aquí */}
        
        <header className="shop-header">
            <h1>Limpieza</h1>
        </header>

        {(!transformedProducts || transformedProducts.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {transformedProducts && transformedProducts.length > 0 && (
          <ShopPageClient products={transformedProducts} />
        )}
    </div>
  );
}