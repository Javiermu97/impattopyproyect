// app/admin/products/new/page.tsx
export const dynamic = 'force-dynamic'

import { createAuthServerClient } from '@/lib/supabase/auth-server'
import { redirect } from 'next/navigation'
import { createProduct } from '@/app/admin/actions'

export default async function NewProductPage() {
  // ✅ CAMBIO CLAVE: Esperar al cliente de Supabase
  const supabase = await createAuthServerClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="admin-container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Añadir Nuevo Producto</h1>

      <form action={createProduct} className="admin-form" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <input name="name" placeholder="Nombre del Producto" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input name="price" type="number" placeholder="Precio Actual" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input name="oldPrice" type="number" placeholder="Precio Anterior (Opcional)" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <input name="categoria" placeholder="Categoría" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input name="texto_oferta" placeholder="Texto de Oferta (ej: 20% OFF)" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input name="imageUrl" placeholder="Imagen Principal URL" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '10px' }} />
          <input name="imageUrl2" placeholder="Imagen Secundaria URL (Opcional)" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#007bff', fontWeight: 'bold' }}>Video del Producto</label>
          <input name="videoUrl" placeholder="URL del Video (YouTube o Directo)" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '2px solid #007bff' }} />
        </div>

        <textarea name="galleryImages" placeholder="Galería de imágenes (separa las URLs con comas)" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '80px', marginBottom: '20px' }} />

        <div style={{ marginBottom: '20px' }}>
           <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
             <input type="checkbox" name="inStock" defaultChecked />
             <span>¿Hay stock disponible?</span>
           </label>
        </div>

        <button type="submit" className="admin-submit-btn" style={{ width: '100%', padding: '15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          CREAR PRODUCTO
        </button>
      </form>
    </div>
  )
}