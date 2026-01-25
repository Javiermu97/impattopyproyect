// app/admin/stats/page.tsx
export const dynamic = 'force-dynamic'

import { createAuthServerClient } from '@/lib/supabase/auth-server';
import { redirect } from 'next/navigation';
import SalesChart from './SalesChart'; 

async function getSalesData() {
  const supabase = await createAuthServerClient();
  
  // Llamamos a la función RPC que tienes en Supabase
  const { data, error } = await supabase.rpc('get_monthly_sales');
  
  if (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
  return data || [];
}

export default async function StatsPage() {
  const supabase = await createAuthServerClient();
  
  // Verificamos sesión con el cliente nuevo
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/admin/login');

  const salesData = await getSalesData();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a' }}>Estadísticas de Ventas</h1>
        <p style={{ color: '#666' }}>Resumen mensual de ingresos (Gs.)</p>
      </header>

      <div style={{ 
        backgroundColor: '#fff', 
        padding: '30px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
        border: '1px solid #eee',
        height: '500px' 
      }}>
        <SalesChart data={salesData} />
      </div>
    </div>
  );
}