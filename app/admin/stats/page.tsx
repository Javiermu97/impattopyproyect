export const dynamic = 'force-dynamic';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import SalesChart from './SalesChart';

export default async function StatsPage() {
  const supabase = await createAuthServerClient();
  
  // 1. Obtener Ventas
  const { data: salesData } = await supabase.rpc('get_monthly_sales');
  
  // 2. Obtener Top Productos (Aumentado a 10 y con stock)
  const { data: topProducts } = await supabase
    .from('productos')
    .select('name, price, stock')
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
          <h3 style={{ marginBottom: '20px' }}>Productos Destacados</h3>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
            {topProducts?.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>{p.name}</span>
                  <span style={{ fontSize: '11px', color: '#999' }}>Stock disponible: {p.stock ?? 0}</span>
                </div>
                <span style={{ fontWeight: 'bold', color: '#A78D5A', fontSize: '13px', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                  Gs. {p.price.toLocaleString('es-PY')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}