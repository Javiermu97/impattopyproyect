// app/admin/stats/page.tsx
export const dynamic = 'force-dynamic';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import SalesChart from './SalesChart';

export default async function StatsPage() {
  const supabase = await createAuthServerClient();

  // 1. Obtener Ventas del RPC
  const { data: salesData } = await supabase.rpc('get_monthly_sales');
  
  // 2. Obtener Top 5 de productos por precio (referencia rápida)
  const { data: topProducts } = await supabase
    .from('productos')
    .select('name, price')
    .order('price', { ascending: false })
    .limit(5);

  // 3. Conteo de Wishlist
  const { count: wishlistCount } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact', head: true });

  const cardStyle = {
    padding: '25px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    border: '1px solid #eee',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center'
  };

  const labelStyle = { fontSize: '12px', color: '#888', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '8px' };
  const valueStyle = { fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontWeight: '800', fontSize: '28px', marginBottom: '8px', color: '#1a1a1a' }}>Análisis de Negocio</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Monitorea el rendimiento de tu tienda en tiempo real.</p>

      {/* MÉTRICAS RÁPIDAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <span style={labelStyle}>INGRESOS DEL MES</span>
          <h2 style={valueStyle}>Gs. {salesData?.[0]?.total.toLocaleString('es-PY') || 0}</h2>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>PRODUCTOS EN FAVORITOS</span>
          <h2 style={valueStyle}>{wishlistCount || 0} <span style={{fontSize: '18px'}}>❤️</span></h2>
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>VISITAS ESTIMADAS</span>
          <h2 style={valueStyle}>1.2k <span style={{fontSize: '14px', color: '#28a745'}}>+12%</span></h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }}>
        {/* GRÁFICO PRINCIPAL */}
        <div style={{ ...cardStyle, height: '450px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '25px' }}>Flujo de Caja Mensual</h3>
          <div style={{ flex: 1 }}>
            <SalesChart data={salesData || []} />
          </div>
        </div>

        {/* LISTA DE MÁS VALIOSOS */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Top Productos (Valor)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {topProducts?.map((prod, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: '13px', color: '#333', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#A78D5A' }}>Gs. {prod.price.toLocaleString('es-PY')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}