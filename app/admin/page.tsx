// app/admin/page.tsx
import { createAuthServerClient } from '@/lib/supabase/auth-server'
import { redirect } from 'next/navigation'
import OrdersTable from './OrdersTable'

export default async function AdminDashboard() {
  const supabase = await createAuthServerClient()

  // ✅ Verificar sesión
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  // ✅ Cargar órdenes
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', minHeight: '80vh' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>Panel de Administración</h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Bienvenido al centro de control de tu tienda.</p>
      </header>

      {/* BOTONES DE ACCIÓN REDISEÑADOS */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '50px'
      }}>
        <a href="/admin/products" style={{
          flex: 1,
          padding: '16px 20px',
          backgroundColor: '#A78D5A', // Tu color dorado profesional
          color: 'white',
          borderRadius: '10px',
          textDecoration: 'none',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          📦 VER LISTA DE PRODUCTOS
        </a>
        <a href="/admin/products/new" style={{
          flex: 1,
          padding: '16px 20px',
          backgroundColor: '#28a745', // Verde éxito estándar
          color: 'white',
          borderRadius: '10px',
          textDecoration: 'none',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
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

