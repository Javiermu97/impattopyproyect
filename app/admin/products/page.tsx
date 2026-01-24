export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DeleteProductButton from './DeleteProductButton'

export default async function AdminProductsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ success?: string, updated?: string }> 
}) {
  const supabase = await createClient()
  const params = await searchParams

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  // Corregido: Usamos la tabla 'productos'
  const { data: products } = await supabase
    .from('productos')
    .select('*')
    .order('id', { ascending: false })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Mensajes de éxito */}
      {(params.success || params.updated) && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #c3e6cb' }}>
          {params.success ? '✅ ¡Producto creado con éxito!' : '✅ ¡Producto actualizado correctamente!'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', color: '#333' }}>Gestión de Productos</h1>
        <Link href="/admin/products/new" style={{ backgroundColor: '#28a745', color: 'white', padding: '12px 20px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
          + Añadir Nuevo Producto
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '15px' }}>Imagen</th>
              <th style={{ padding: '15px' }}>Nombre</th>
              <th style={{ padding: '15px' }}>Precio</th>
              <th style={{ padding: '15px' }}>Estado</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px 15px' }}>
                  <img src={product.imageUrl} alt="" style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '15px', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '15px' }}>Gs. {product.price.toLocaleString('es-PY')}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ backgroundColor: product.inStock ? '#e2f9e1' : '#ffe5e5', color: product.inStock ? '#28a745' : '#dc3545', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                    {product.inStock ? 'EN STOCK' : 'AGOTADO'}
                  </span>
                </td>
                <td style={{ padding: '15px', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
                  <Link href={`/admin/products/edit/${product.id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                    Editar
                  </Link>
                  <DeleteProductButton productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}