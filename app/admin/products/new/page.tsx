export const dynamic = 'force-dynamic'

import { createAuthServerClient } from '@/lib/supabase/auth-server'
import { redirect } from 'next/navigation'
import { createProduct } from '@/app/admin/actions'

export default async function NewProductPage() {
  const supabase = await createAuthServerClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
    color: '#000000',
    fontSize: '14px',
    backgroundColor: '#fff',
    WebkitTextFillColor: '#000000',
    opacity: 1
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#333'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: '700' }}>Añadir Nuevo Producto</h1>

      <form action={createProduct} style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #eee'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Nombre del Producto</label>
            <input name="name" required style={inputStyle} placeholder="Ej: Humidificador..." />
          </div>
          <div>
            <label style={labelStyle}>Precio Actual (Gs.)</label>
            <input name="price" type="number" required style={inputStyle} placeholder="0" />
          </div>
          <div>
            <label style={labelStyle}>Precio Anterior</label>
            <input name="oldPrice" type="number" style={inputStyle} placeholder="0" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Categoría</label>
            <input name="categoria" style={inputStyle} placeholder="Salud, Hogar..." />
          </div>
          <div>
            <label style={labelStyle}>Texto de Oferta</label>
            <input name="texto_oferta" style={inputStyle} placeholder="Ej: 20% OFF" />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URLs de Imágenes</label>
          <input name="imageUrl" required placeholder="Imagen Principal URL" style={{ ...inputStyle, marginBottom: '10px' }} />
          <input name="imageUrl2" placeholder="Imagen Secundaria URL (Opcional)" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Video del Producto</label>
          <input name="videoUrl" placeholder="URL del Video (MP4 o YouTube)" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Galería de imágenes (Separar con coma)</label>
          <textarea name="galleryImages" style={{ ...inputStyle, height: '80px', fontFamily: 'inherit' }} placeholder="url1, url2, url3..." />
        </div>

        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" name="inStock" id="inStock" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
          <label htmlFor="inStock" style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>¿Hay stock disponible?</label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Descripción Texto Oferta (Detalle)</label>
          <textarea name="descripcion_oferta" style={{ ...inputStyle, height: '60px', fontFamily: 'inherit' }} placeholder="Escribe el detalle de la oferta aquí..." />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <div>
            <label style={labelStyle}>¿Más Vendido?</label>
            <select name="es_mas_vendido" style={inputStyle}>
              <option value="">NULO (Por defecto)</option>
              <option value="TRUE">VERDADERO</option>
              <option value="FALSE">FALSO</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>¿Destacado Semana?</label>
            <select name="es_destacado_semana" style={inputStyle}>
              <option value="">NULO (Por defecto)</option>
              <option value="TRUE">VERDADERO</option>
              <option value="FALSE">FALSO</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>¿Destacado Hogar?</label>
            <select name="es_destacado_hogar" style={inputStyle}>
              <option value="">NULO (Por defecto)</option>
              <option value="TRUE">VERDADERO</option>
              <option value="FALSE">FALSO</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ width: '280px', padding: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            CREAR PRODUCTO
          </button>
        </div>
      </form>
    </div>
  )
}