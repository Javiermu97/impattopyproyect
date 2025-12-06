import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OrdersTable from './OrdersTable'

type Order = {
  id: number
  created_at: string
  customer_name: string
  total_amount: number
  status: string
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error.message)
  }

  const ordersData: Order[] = orders || []

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Administración</h1>
      <h2>Historial de Pedidos</h2>

      <OrdersTable initialOrders={ordersData} />
    </div>
  )
}
