import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OrdersTable from './OrdersTable';

type Order = {
  id: number;
  created_at: string;
  customer_name: string;
  total_amount: number;
  status: string;
};

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  const orders: Order[] = data || [];

  if (error) {
    console.error('Error fetching orders:', error.message);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Administración</h1>
      <h2>Historial de Pedidos</h2>
      <OrdersTable initialOrders={orders} />
    </div>
  );
}