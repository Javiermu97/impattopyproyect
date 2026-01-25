// app/admin/products/edit/[id]/page.tsx
import { notFound } from 'next/navigation';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import { updateProduct, createCaracteristica } from '@/app/admin/actions';
import DeleteCaracteristicaButton from './DeleteCaracteristicaButton';

interface Caracteristica {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  orden: number;
}

async function getProduct(id: number) {
  const supabase = await createAuthServerClient();
  const { data } = await supabase
    .from('productos')
    .select('*, caracteristicas (*)')
    .eq('id', id)
    .order('orden', { referencedTable: 'caracteristicas', ascending: true })
    .single();
  return data;
}

// Componente para selects de SI/NO con estilo profesional
function BooleanSelectEdit({ name, label, defaultValue }: { name: string; label: string; defaultValue: any }) {
  const val = defaultValue === true ? 'true' : defaultValue === false ? 'false' : 'null';
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#444' }}>{label}</label>
      <select 
        name={name} 
        defaultValue={val} 
        style={{ 
          width: '100%', 
          padding: '10px', 
          borderRadius: '6px', 
          border: '1px solid #ddd',
          backgroundColor: '#fff',
          fontSize: '14px'
        }}
      >
        <option value="true">SÍ</option>
        <option value="false">NO</option>
      </select>
    </div>
  );
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(Number(resolvedParams.id));

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  const inputStyle = {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box' as const
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#666'
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Editar Producto</h1>
        <span style={{ fontSize: '14px', color: '#888' }}>ID: {product.id}</span>
      </div>

      <form action={updateProductWithId} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
        
        {/* Fila 1: Nombre y Precios */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
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

        {/* Fila 2: Categoría y Oferta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Categoría</label>
            <input name="categoria" defaultValue={product.categoria || ''} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Texto de Oferta</label>
            <input name="texto_oferta" defaultValue={product.texto_oferta || ''} style={inputStyle} />
          </div>
        </div>

        {/* Fila 3: Imágenes y Video (Color corregido) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URLs de Imágenes (Principal y Secundaria)</label>
          <input name="imageUrl" defaultValue={product.imageUrl} placeholder="URL Principal" style={{ ...inputStyle, marginBottom: '10px' }} />
          <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} placeholder="URL Secundaria" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ ...labelStyle, color: '#333' }}>Video del Producto</label>
          <input 
            name="videoUrl" 
            defaultValue={product.videoUrl || ''} 
            placeholder="URL del Video (YouTube o MP4)" 
            style={inputStyle} // Removido el borde azul
          />
        </div>

        {/* Galería y Stock */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Galería de Imágenes (Separadas por coma)</label>
          <textarea name="galleryImages" defaultValue={product.galleryImages?.join(', ') || ''} style={{ ...inputStyle, minHeight: '80px', fontFamily: 'inherit' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <BooleanSelectEdit name="inStock" label="¿Hay Stock?" defaultValue={product.inStock} />
          <BooleanSelectEdit name="es_mas_vendido" label="¿Más Vendido?" defaultValue={product.es_mas_vendido} />
          <BooleanSelectEdit name="es_destacado_semana" label="¿Destacado Semana?" defaultValue={product.es_destacado_semana} />
          <BooleanSelectEdit name="es_destacado_hogar" label="¿Destacado Hogar?" defaultValue={product.es_destacado_hogar} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', transition: 'background 0.2s' }}>
          GUARDAR TODOS LOS CAMBIOS
        </button>
      </form>

      {/* Sección de Características con estilo mejorado */}
      <section style={{ marginTop: '50px', backgroundColor: '#fafafa', padding: '30px', borderRadius: '12px', border: '1px solid #eee' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Características y Detalles</h2>
        
        <form action={createCaracteristica} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px', marginBottom: '30px', alignItems: 'end' }}>
          <input type="hidden" name="producto_id" value={product.id} />
          <div>
            <label style={labelStyle}>Título</label>
            <input name="titulo" required style={inputStyle} placeholder="Ej: Material" />
          </div>
          <div>
            <label style={labelStyle}>Descripción</label>
            <input name="descripcion" style={inputStyle} placeholder="Ej: Plástico ABS de alta resistencia" />
          </div>
          <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Añadir
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {product.caracteristicas?.map((c: Caracteristica) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>{c.titulo}:</span>
                <span style={{ marginLeft: '10px', fontSize: '14px' }}>{c.descripcion}</span>
              </div>
              <DeleteCaracteristicaButton id={c.id} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}