import { notFound } from 'next/navigation';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import { updateProduct, createCaracteristica } from '@/app/admin/actions';
import DeleteCaracteristicaButton from './DeleteCaracteristicaButton';
import Link from 'next/link';

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
  const boolToValue = (val: any) => val === true ? "TRUE" : val === false ? "FALSE" : "";

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
            <label style={labelStyle}>Texto Oferta (Título)</label>
            <input name="texto_oferta" defaultValue={product.texto_oferta || ''} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Disponibilidad</label>
            <select name="inStock" defaultValue={product.inStock ? "TRUE" : "FALSE"} style={inputStyle}>
              <option value="TRUE">EN STOCK</option>
              <option value="FALSE">AGOTADO</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URLs de Imágenes</label>
          <input name="imageUrl" defaultValue={product.imageUrl} required style={{ ...inputStyle, marginBottom: '10px' }} />
          <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URL del Video</label>
          <input name="videoUrl" defaultValue={product.videoUrl || ''} placeholder="URL Video MP4 o YouTube" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Galería (Separar con coma)</label>
          <textarea name="galleryImages" defaultValue={product.galleryImages?.join(', ') || ''} style={{ ...inputStyle, height: '80px', fontFamily: 'inherit' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Descripción Texto Oferta (Detalle)</label>
          {/* CORRECCIÓN: Usamos product["descripción"] para leer el dato de Supabase */}
          <textarea 
            name="descripcion_oferta" 
            defaultValue={product["descripción"] || ''} 
            style={{ ...inputStyle, height: '60px', fontFamily: 'inherit' }} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <div>
            <label style={labelStyle}>¿Más Vendido?</label>
            {/* CORRECCIÓN: Se usa es_mas_vendido en singular */}
            <select name="es_mas_vendido" defaultValue={boolToValue(product.es_mas_vendido)} style={inputStyle}>
              <option value="">NULO</option>
              <option value="TRUE">VERDADERO</option>
              <option value="FALSE">FALSO</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>¿Destacado Semana?</label>
            <select name="es_destacado_semana" defaultValue={boolToValue(product.es_destacado_semana)} style={inputStyle}>
              <option value="">NULO</option>
              <option value="TRUE">VERDADERO</option>
              <option value="FALSE">FALSO</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>¿Destacado Hogar?</label>
            <select name="es_destacado_hogar" defaultValue={boolToValue(product.es_destacado_hogar)} style={inputStyle}>
              <option value="">NULO</option>
              <option value="TRUE">VERDADERO</option>
              <option value="FALSE">FALSO</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ width: '280px', padding: '16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase' }}>
            GUARDAR CAMBIOS
          </button>
        </div>
      </form>

      <section style={{ marginTop: '50px', borderTop: '2px solid #f0f0f0', paddingTop: '30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '700' }}>Características Técnicas</h2>
        <form action={createCaracteristica} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '25px', backgroundColor: '#fcfcfc', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
          <input type="hidden" name="producto_id" value={product.id} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Título</label>
              <input name="titulo" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>URL Imagen</label>
              <input name="imagen" style={inputStyle} />
            </div>
          </div>
          
          <div>
            <label style={labelStyle}>Descripción (Permite varias líneas)</label>
            <textarea name="descripcion" required style={{ ...inputStyle, height: '80px', fontFamily: 'inherit' }} />
          </div>

          <div style={{ width: '120px' }}>
            <label style={labelStyle}>Orden</label>
            <input name="orden" type="number" defaultValue="0" style={inputStyle} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button type="submit" style={{ width: '220px', height: '47px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Añadir Característica
            </button>
          </div>
        </form>

        <div style={{ display: 'grid', gap: '10px' }}>
          {product.caracteristicas?.sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0)).map((c: any) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '12px', color: '#999' }}>#{c.orden}</span>
                <span style={{ fontSize: '14px' }}><strong>{c.titulo}:</strong> {c.descripcion}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link href={`/admin/caracteristicas/edit/${c.id}`} style={{ padding: '8px 15px', backgroundColor: '#A78D5A', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
                  Editar
                </Link>
                <DeleteCaracteristicaButton id={c.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}