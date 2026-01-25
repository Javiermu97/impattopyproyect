export const dynamic = 'force-dynamic';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import SalesChart from './SalesChart';

export default async function StatsPage() {
  const supabase = await createAuthServerClient();
  
  // 1. Obtener Ventas Mensuales
  const { data: salesData } = await supabase.rpc('get_monthly_sales');
  
  // 2. RECUPERAR FAVORITOS (RESTAURADO)
  const { count: wishlistCount } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact', head: true });

  // 3. EXTRAER VENTAS REALES DESDE EL JSONB
  const { data: orders } = await supabase
    .from('orders')
    .select('order_details');

  const productCounts: Record<string, { name: string, quantity: number, price: number }> = {};
  
  orders?.forEach(order => {
    const details = order.order_details;
    if (details && details.product_name) {
      const name = details.product_name;
      const qty = details.quantity || 1;
      const price = details.unit_price || 0;
      
      if (productCounts[name]) {
        productCounts[name].quantity += qty;
      } else {
        productCounts[name] = { name, quantity: qty, price };
      }
    }
  });

  const topSold = Object.values(productCounts).sort((a, b) => b.quantity - a.quantity);

  // 4. Visitantes Únicos (Detección por Dispositivo)
  const { data: viewsData } = await supabase.from('page_views').select('session_id');
  const totalUniqueVisitors = new Set(viewsData?.map(v => v.session_id)).size;

  const cardStyle = { padding: '25px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee' };
  const labelStyle = { fontSize: '11px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' as const };
  const valueStyle = { fontSize: '24px', fontWeight: '800', margin: '5px 0 0 0' };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '30px' }}>Dashboard Profesional</h1>
      
      {/* Seccion superior con 3 columnas: Ingresos, Favoritos y Personas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <span style={labelStyle}>Ingresos Totales</span>
          <p style={valueStyle}>Gs. {salesData?.[0]?.total?.toLocaleString('es-PY') || 0}</p>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Interés de Clientes (❤️)</span>
          <p style={valueStyle}>{wishlistCount || 0} Favoritos</p>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Personas Reales</span>
          <p style={valueStyle}>{totalUniqueVisitors}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }}>
        <div style={{ ...cardStyle, height: '450px' }}>
          <h3 style={{ marginBottom: '20px' }}>Ventas Mensuales</h3>
          <SalesChart data={salesData || []} />
        </div>
        
        <div style={{ ...cardStyle, height: '450px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '20px' }}>Top Ventas Reales</h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {topSold.length === 0 ? (
              <p style={{ color: '#999', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>No hay ventas registradas.</p>
            ) : (
              topSold.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{p.name}</span>
                    <span style={{ fontSize: '11px', color: '#A78D5A' }}>Cant: {p.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>Gs. {p.price.toLocaleString('es-PY')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}