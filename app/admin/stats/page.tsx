export const dynamic = 'force-dynamic'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SalesChart from './SalesChart'; // Componente de cliente para el gráfico

async function getSalesData() {
  const supabase = createServerComponentClient({ cookies });
  // Llamamos a nuestra función RPC
  const { data, error } = await supabase.rpc('get_monthly_sales');
  if (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
  return data;
}

export default async function StatsPage() {
  const { data: { session } } = await createServerComponentClient({ cookies }).auth.getSession();
  if (!session) redirect('/admin/login');

  const salesData = await getSalesData();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Estadísticas de Ventas</h1>
      <div style={{ marginTop: '40px', height: '400px' }}>
        <SalesChart data={salesData} />
      </div>
    </div>
  );
}