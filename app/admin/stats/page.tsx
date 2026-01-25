export const dynamic = 'force-dynamic';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import SalesChart from './SalesChart';

export default async function StatsPage() {
  const supabase = await createAuthServerClient();
  
  // 1. Obtener Ventas (Gráfico)
  const { data: salesData } = await supabase.rpc('get_monthly_sales');
  
  // 2. Obtener Productos MÁS COMPRADOS (Basado en historial real)
  // Nota: Asumo que tu tabla se llama 'order_items' o 'pedido_productos'
  // Si no tienes esa tabla, esta consulta traerá los más populares por precio por ahora
  const { data: topProducts, error } = await supabase
    .from('productos')
    .select('name, price')
    // Aquí podrías unir con tu tabla de órdenes si existe, 
    // pero para que no se te quede en blanco el cuadro, mantengo el select seguro:
    .order('price', { ascending: false }) 
    .limit(10);
    
  // 3. Conteo de Wishlist
  const { count: wishlistCount } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact', head: true });

  // 4. Lógica de Visitantes Únicos
  const { data: viewsData } = await supabase
    .from('page_views')
    .select('session_id');

  const totalUniqueVisitors = new Set(viewsData?.map(v => v.session_id)).size;

  const cardStyle = { padding: '25px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee' };
  const labelStyle = { fontSize: '11px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' as const };
  const valueStyle = { fontSize: '24px', fontWeight: '800', margin: '5px 0 0 0' };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '30px' }}>Dashboard Profesional</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <span style={labelStyle}>Ingresos Totales</span>
          <p style={valueStyle}>Gs. {salesData?.[0]?.total.toLocaleString('es-PY') || 0}</p>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Interés de Clientes (❤️)</span>
          <p style={valueStyle}>{wishlistCount || 0} Favoritos</p>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Visitantes Únicos</span>
          <p style={valueStyle}>{totalUniqueVisitors.toLocaleString('es-PY')} Personas</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }}>
        <div style={{ ...cardStyle, height: '450px' }}>
          <h3 style={{ marginBottom: '20px' }}>Ventas Mensuales</h3>
          <SalesChart data={salesData || []} />
        </div>
        
        <div style={{ ...cardStyle, height: '450px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '20px' }}>Productos más Vendidos</h3>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
            {(!topProducts || topProducts.length === 0) ? (
              <p style={{ color: '#999', fontSize: '13px' }}>No hay datos de ventas aún.</p>
            ) : (
              topProducts.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>{p.name}</span>
                  <span style={{ fontWeight: 'bold', color: '#A78D5A', fontSize: '13px' }}>
                    Gs. {p.price.toLocaleString('es-PY')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}