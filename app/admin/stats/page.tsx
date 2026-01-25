export const dynamic = 'force-dynamic';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import SalesChart from './SalesChart';

export default async function StatsPage() {
  const supabase = await createAuthServerClient();
  
  // 1. Obtener Ventas Mensuales para el gráfico
  const { data: salesData } = await supabase.rpc('get_monthly_sales');
  
  // 2. Obtener PRODUCTOS MÁS VENDIDOS (Real)
  // Nota: Buscamos en la tabla 'order_items' que es la que tiene el historial de Wildo y Maria Ines
  const { data: topSold } = await supabase
    .from('order_items')
    .select('product_name, quantity, price')
    .order('quantity', { ascending: false })
    .limit(10);

  // 3. Conteo de Favoritos
  const { count: wishlistCount } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact', head: true });

  // 4. Lógica de Visitantes por Dispositivo
  const { data: viewsData } = await supabase.from('page_views').select('session_id');
  const totalUniqueDevices = new Set(viewsData?.map(v => v.session_id)).size;

  const cardStyle = { padding: '25px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee' };
  const labelStyle = { fontSize: '11px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' as const };
  const valueStyle = { fontSize: '24px', fontWeight: '800', margin: '5px 0 0 0' };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '30px' }}>Dashboard Profesional</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <span style={labelStyle}>Ingresos Totales</span>
          <p style={valueStyle}>Gs. {salesData?.[0]?.total?.toLocaleString('es-PY') || 0}</p>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Interés de Clientes (❤️)</span>
          <p style={valueStyle}>{wishlistCount || 0} Favoritos</p>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Visitantes Reales (Dispositivos)</span>
          <p style={valueStyle}>{totalUniqueDevices} {totalUniqueDevices === 1 ? 'Persona' : 'Personas'}</p>
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
            {(!topSold || topSold.length === 0) ? (
              <p style={{ color: '#999', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>No hay ventas registradas aún.</p>
            ) : (
              topSold.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{p.product_name}</span>
                    <span style={{ fontSize: '11px', color: '#A78D5A' }}>Cantidad: {p.quantity}</span>
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