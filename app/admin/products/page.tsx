import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DeleteProductButton from './DeleteProductButton'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/admin/login')

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('id')

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Gestión de Productos</h1>
        <Link
          href="/admin/products/new"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 15px',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          + Añadir Producto
        </Link>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {product.id}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {product.name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                Gs. {product.price.toLocaleString('es-PY')}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {product.inStock ? 'En Stock' : 'Agotado'}
              </td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <Link href={`/admin/products/edit/${product.id}`} style={{ color: 'blue' }}>
                  Editar
                </Link>
                <DeleteProductButton productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
