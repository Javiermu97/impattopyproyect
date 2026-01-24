import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import OrdersTable from './OrdersTable'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Verificamos sesión
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Cargamos las órdenes
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Panel de Administración</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Bienvenido al centro de control de tu tienda.</p>
      
      {/* ✅ SECCIÓN DE ACCESO RÁPIDO A PRODUCTOS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <Link href="/admin/products" style={{ 
          padding: '25px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          borderRadius: '12px', 
          textDecoration: 'none', 
          textAlign: 'center', 
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,123,255,0.2)'
        }}>
          📦 VER LISTA DE PRODUCTOS
        </Link>
        <Link href="/admin/products/new" style={{ 
          padding: '25px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          borderRadius: '12px', 
          textDecoration: 'none', 
          textAlign: 'center', 
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(40,167,69,0.2)'
        }}>
          ➕ AÑADIR NUEVO PRODUCTO
        </Link>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '40px' }} />

      <h2 style={{ marginBottom: '20px' }}>Historial de Pedidos</h2>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <OrdersTable initialOrders={orders || []} />
      </div>
    </div>
  )
}



