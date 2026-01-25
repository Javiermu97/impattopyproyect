// app/admin/stats/page.tsx
export const dynamic = 'force-dynamic';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import SalesChart from './SalesChart';

export default async function StatsPage() {
  const supabase = await createAuthServerClient();

  // 1. Obtener Ventas Totales
  const { data: salesData } = await supabase.rpc('get_monthly_sales');
  
  // 2. Obtener Top Productos (Necesitas crear esta función en SQL)
  const { data: topProducts } = await supabase.from('productos').select('name, price').order('price', { ascending: false }).limit(5);

  // 3. Conteo de Wishlist (Icono corazón)
  // Asumiendo que tienes una tabla llamada 'wishlist' o similar
  const { count: wishlistCount } = await supabase.from('wishlist').select('*', { count: 'exact', head: true });

  const cardStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '1px solid #eee',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontWeight: '800', fontSize: '28px', marginBottom: '30px' }}>Dashboard de Negocios</h1>

      {/* MÉTRICAS RÁPIDAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>VENTAS DEL MES</p>
          <h2 style={{ fontSize: '22px', margin: '10px 0 0 0' }}>Gs. {salesData?.[0]?.total.toLocaleString('es-PY') || 0}</h2>
        </div>
        <div style={cardStyle}>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>PRODUCTOS FAVORITOS</p>
          <h2 style={{ fontSize: '22px', margin: '10px 0 0 0' }}>{wishlistCount || 0} ❤️</h2>
        </div>
        <div style={cardStyle}>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>VISITAS AL SITIO</p>
          <h2 style={{ fontSize: '22px', margin: '10px 0 0 0' }}>Analizando...</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* GRÁFICO PRINCIPAL */}
        <div style={{ ...cardStyle, height: '400px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Rendimiento de Ventas Mensuales</h3>
          <SalesChart data={salesData || []} />
        </div>

        {/* LISTA DE MÁS VENDIDOS */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Top 5 Productos</h3>
          {topProducts?.map((prod, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9' }}>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>{prod.name}</span>
              <span style={{ fontSize: '13px', color: '#A78D5A' }}>Gs. {prod.price.toLocaleString('es-PY')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}