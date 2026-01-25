// app/admin/products/page.tsx
export const dynamic = 'force-dynamic'
import { createAuthServerClient } from '@/lib/supabase/auth-server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DeleteProductButton from './DeleteProductButton'

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ success?: string, updated?: string }> }) {
  const supabase = await createAuthServerClient()
  const params = await searchParams

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  const { data: products } = await supabase
    .from('productos')
    .select('*')
    .order('id', { ascending: false })

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Alertas */}
      {(params.success || params.updated) && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          {params.success ? '✅ Producto creado con éxito' : '✅ Producto actualizado correctamente'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Gestión de Productos</h1>
        <Link href="/admin/products/new" style={{ backgroundColor: '#28a745', color: 'white', padding: '12px 20px', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px' }}>
          + AÑADIR PRODUCTO
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #eee' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '18px', textAlign: 'left', fontSize: '13px' }}>Imagen</th>
              <th style={{ padding: '18px', textAlign: 'left', fontSize: '13px' }}>Nombre</th>
              <th style={{ padding: '18px', textAlign: 'left', fontSize: '13px' }}>Precio</th>
              <th style={{ padding: '18px', textAlign: 'left', fontSize: '13px' }}>Estado</th>
              <th style={{ padding: '18px', textAlign: 'center', fontSize: '13px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 18px' }}>
                  <img src={product.imageUrl} alt="" style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '18px', fontWeight: '600', fontSize: '14px', color: '#000' }}>{product.name}</td>
                <td style={{ padding: '18px', fontSize: '14px', color: '#000' }}>Gs. {product.price.toLocaleString('es-PY')}</td>
                <td style={{ padding: '18px' }}>
                  <span style={{ 
                    backgroundColor: product.inStock ? '#e2f9e1' : '#ffe5e5', 
                    color: product.inStock ? '#28a745' : '#dc3545', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '11px', 
                    fontWeight: '800' 
                  }}>
                    {product.inStock ? 'STOCK' : 'AGOTADO'}
                  </span>
                </td>
                <td style={{ padding: '18px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <Link href={`/admin/products/edit/${product.id}`} style={{ 
                    color: '#A78D5A', 
                    textDecoration: 'none', 
                    fontWeight: '700', 
                    fontSize: '12px',
                    border: '1px solid #A78D5A',
                    padding: '5px 12px',
                    borderRadius: '4px'
                  }}>
                    EDITAR
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