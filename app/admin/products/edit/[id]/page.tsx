import { notFound } from 'next/navigation';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import { updateProduct, createCaracteristica } from '@/app/admin/actions';
import DeleteCaracteristicaButton from './DeleteCaracteristicaButton';

async function getProduct(id: number) {
  const supabase = await createAuthServerClient();
  const { data } = await supabase
    .from('productos')
    .select('*, caracteristicas (*)')
    .eq('id', id)
    .single();
  return data;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(Number(resolvedParams.id));
  if (!product) notFound();

  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #ccc', 
    boxSizing: 'border-box' as const,
    color: '#000000', 
    fontSize: '15px',
    fontWeight: '500',
    backgroundColor: '#ffffff',
    WebkitTextFillColor: '#000000', 
    opacity: 1,
    outline: 'none'
  };

  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#1a1a1a' };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', minHeight: '90vh' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '22px', fontWeight: '700' }}>Editar Producto: {product.name}</h1>

      <form action={updateProduct.bind(null, product.id)} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Nombre del Producto</label>
            <input name="name" defaultValue={product.name} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Precio Actual (Gs.)</label>
            <input name="price" type="number" defaultValue={product.price} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Precio Anterior</label>
            <input name="oldPrice" type="number" defaultValue={product.oldPrice || ''} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Categoría</label>
            <input name="categoria" defaultValue={product.categoria || ''} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Texto Oferta</label>
            <input name="texto_oferta" defaultValue={product.texto_oferta || ''} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Disponibilidad</label>
            {/* CORRECCIÓN: Los valores ahora son TRUE/FALSE en mayúsculas */}
            <select name="inStock" defaultValue={product.inStock ? "TRUE" : "FALSE"} style={inputStyle}>
              <option value="TRUE">EN STOCK</option>
              <option value="FALSE">AGOTADO</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URLs de Imágenes</label>
          <input name="imageUrl" defaultValue={product.imageUrl} placeholder="URL Imagen Principal" style={{ ...inputStyle, marginBottom: '10px' }} />
          <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} placeholder="URL Imagen Secundaria" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URL del Video</label>
          <input name="videoUrl" defaultValue={product.videoUrl || ''} placeholder="URL Video MP4 o YouTube" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Galería (Separar con coma)</label>
          <textarea name="galleryImages" defaultValue={product.galleryImages?.join(', ') || ''} style={{ ...inputStyle, height: '80px', fontFamily: 'inherit' }} />
        </div>

        {/* BOTÓN GUARDAR: CENTRADO Y CORTO */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ 
            width: '280px', 
            padding: '16px', 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontSize: '14px',
            textTransform: 'uppercase'
          }}>
            GUARDAR CAMBIOS
          </button>
        </div>
      </form>

      <section style={{ marginTop: '50px', borderTop: '2px solid #f0f0f0', paddingTop: '30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '700' }}>Características Técnicas</h2>
        <form action={createCaracteristica} style={{ display: 'flex', gap: '12px', marginBottom: '25px', alignItems: 'flex-end' }}>
          <input type="hidden" name="producto_id" value={product.id} />
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Título</label>
            <input name="titulo" required style={inputStyle} />
          </div>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Descripción</label>
            <input name="descripcion" style={inputStyle} />
          </div>
          <button type="submit" style={{ height: '47px', padding: '0 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Añadir</button>
        </form>

        <div style={{ display: 'grid', gap: '10px' }}>
          {product.caracteristicas?.map((c: any) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
              <span style={{ fontSize: '14px', color: '#000' }}><strong>{c.titulo}:</strong> {c.descripcion}</span>
              <DeleteCaracteristicaButton id={c.id} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}