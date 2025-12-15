import { supabase } from '@/lib/supabaseClient';
import ShopPageClient from '@/app/components/ShopPageClient';

export const metadata = {
  title: "Limpieza - Impatto Py",
  description: "Productos de limpieza para tu hogar.",
};

export default async function LimpiezaPage() {
  
  // Obtener productos de la categoría Limpieza
  const { data: products, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('categoria', '%Limpieza%');

  if (error) {
    console.error('Error al cargar productos de Limpieza:', error);
  }

  return (
    <div className="shop-container">
        
        {/* Título igual que en las otras secciones */}
        <header className="shop-header">
            <h1>Limpieza</h1>
        </header>

        {/* Si no hay productos */}
        {(!products || products.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              No se encontraron productos para esta categoría.
            </p>
          </div>
        )}

        {/* Si existen productos */}
        {products && products.length > 0 && (
          <ShopPageClient products={products} />
        )}
    </div>
  );
}
