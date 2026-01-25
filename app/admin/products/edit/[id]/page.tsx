// app/admin/products/edit/[id]/page.tsx
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

  // ESTILO DE INPUT ACTUALIZADO PARA COLOR NEGRO
  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #ddd', 
    boxSizing: 'border-box' as const,
    color: '#000', // Fuerza el color negro
    fontSize: '14px',
    backgroundColor: '#fff'
  };

  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#333' };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '22px', fontWeight: '700' }}>Editar: {product.name}</h1>

      <form action={updateProduct.bind(null, product.id)} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <label style={labelStyle}>Nombre</label>
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
            <label style={labelStyle}>¿Hay Stock?</label>
            <select name="inStock" defaultValue={product.inStock ? 'true' : 'false'} style={inputStyle}>
              <option value="true">SÍ (En Stock)</option>
              <option value="false">NO (Agotado)</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Imágenes del Producto (URL)</label>
          <input name="imageUrl" defaultValue={product.imageUrl} style={{ ...inputStyle, marginBottom: '10px' }} />
          <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URL del Video</label>
          <input name="videoUrl" defaultValue={product.videoUrl || ''} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Galería (Separar con coma)</label>
          <textarea name="galleryImages" defaultValue={product.galleryImages?.join(', ') || ''} style={{ ...inputStyle, height: '80px', fontFamily: 'sans-serif' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
          GUARDAR CAMBIOS
        </button>
      </form>

      {/* Características */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '700' }}>Características Técnicas</h2>
        <form action={createCaracteristica} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input type="hidden" name="producto_id" value={product.id} />
          <input name="titulo" placeholder="Título" required style={{ ...inputStyle, flex: 1 }} />
          <input name="descripcion" placeholder="Descripción" style={{ ...inputStyle, flex: 2 }} />
          <button type="submit" style={{ padding: '0 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Añadir</button>
        </form>

        {product.caracteristicas?.map((c: any) => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#fff', marginBottom: '10px', borderRadius: '10px', border: '1px solid #eee' }}>
            <span style={{ fontSize: '14px', color: '#000' }}><strong>{c.titulo}:</strong> {c.descripcion}</span>
            <DeleteCaracteristicaButton id={c.id} />
          </div>
        ))}
      </section>
    </div>
  );
}