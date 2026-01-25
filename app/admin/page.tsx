import { createAuthServerClient } from '@/lib/supabase/auth-server'
import { redirect } from 'next/navigation'
import OrdersTable from './OrdersTable'

export default async function AdminDashboard() {
  const supabase = await createAuthServerClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', minHeight: '80vh' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>Panel de Administración</h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Centro de control de IMPATTO</p>
      </header>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '60px'
      }}>
        <a href="/admin/products" style={{
          width: '240px',
          padding: '14px',
          backgroundColor: '#A78D5A', 
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '13px',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 10px rgba(167, 141, 90, 0.2)'
        }}>
          📦 VER LISTA DE PRODUCTOS
        </a>
        <a href="/admin/products/new" style={{
          width: '240px',
          padding: '14px',
          backgroundColor: '#28a745', 
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '13px',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 10px rgba(40, 167, 69, 0.2)'
        }}>
          ➕ AÑADIR NUEVO PRODUCTO
        </a>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#333' }}>Historial de Pedidos Recientes</h2>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          border: '1px solid #f0f0f0',
          overflow: 'hidden'
        }}>
          <OrdersTable initialOrders={orders || []} />
        </div>
      </div>
    </div>
  )
}