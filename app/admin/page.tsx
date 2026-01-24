import { createAuthClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import OrdersTable from './OrdersTable'

export default async function AdminDashboard() {
  const supabase = await createAuthClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
        Panel de Administración
      </h1>

      <p style={{ color: '#666', marginBottom: '30px' }}>
        Bienvenido al centro de control de tu tienda.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        <Link
          href="/admin/products"
          style={{
            padding: '25px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          📦 VER LISTA DE PRODUCTOS
        </Link>

        <Link
          href="/admin/products/new"
          style={{
            padding: '25px',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          ➕ AÑADIR NUEVO PRODUCTO
        </Link>
      </div>

      <OrdersTable initialOrders={orders || []} />
    </div>
  )
}



