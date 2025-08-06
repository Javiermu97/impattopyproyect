// Importamos las herramientas necesarias de Supabase y nuestros componentes
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import ShopPageClient from '@/app/components/ShopPageClient';

// Metadata para SEO y la pestaña del navegador
export const metadata = {
  title: 'Más Vendidos - Impatto Py',
  description: 'Descubre nuestros productos más populares y en tendencia.',
};

// La página es asíncrona para poder consultar la base de datos
export default async function MasVendidosPage() {
  
  // ¡CAMBIO CLAVE AQUÍ!
  // Consultamos la tabla 'productos' filtrando por la columna booleana 'es_mas_vendido'.
  const { data: bestSellers, error } = await supabase
    .from('productos')
    .select('*')
    .eq('es_mas_vendido', true); // Usamos .eq() para buscar un valor exacto (true)

  // Manejamos cualquier error que pueda ocurrir durante la consulta
  if (error) {
    console.error('Error al cargar los productos más vendidos:', error);
  }

  // Renderizamos el componente
  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Más Vendidos</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Aquí encontrarás los productos favoritos de nuestra comunidad.
            </p>
        </header>

        {/* Renderizado Condicional: Muestra un mensaje si no hay productos */}
        {(!bestSellers || bestSellers.length === 0) && (
          <div className="product-grid-area">
            <p className="no-products-message">
              Actualmente no hay productos marcados como más vendidos.
            </p>
          </div>
        )}

        {/* Renderizado Condicional: Muestra los productos solo si existen */}
        {bestSellers && bestSellers.length > 0 && (
          <ShopPageClient products={bestSellers} />
        )}
    </div>
  );
}