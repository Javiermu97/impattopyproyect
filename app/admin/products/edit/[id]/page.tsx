// app/admin/products/edit/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
  const supabase = await createAuthServerClient(); // <--- AWAIT
  const { data } = await supabase
    .from('productos')
    .select('*, caracteristicas (*)')
    .eq('id', id)
    .order('orden', { referencedTable: 'caracteristicas', ascending: true })
    .single();
  return data;
}

function BooleanSelectEdit({ name, label, defaultValue }: { name: string; label: string; defaultValue: any }) {
  const val = defaultValue === true ? 'true' : defaultValue === false ? 'false' : 'null';
  return (
    <div className="form-group" style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>{label}</label>
      <select name={name} defaultValue={val} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
        <option value="null">NULO</option>
        <option value="true">SÍ (TRUE)</option>
        <option value="false">NO (FALSE)</option>
      </select>
    </div>
  );
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // <--- AWAIT para los params en Next 16
  const product = await getProduct(Number(resolvedParams.id));

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="admin-container" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Editar Producto: {product.name}</h1>

      <form action={updateProductWithId} className="admin-form" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <input name="name" defaultValue={product.name} placeholder="Nombre del Producto" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input name="price" type="number" defaultValue={product.price} placeholder="Precio Actual" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input name="oldPrice" type="number" defaultValue={product.oldPrice || ''} placeholder="Precio Anterior" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <input name="categoria" defaultValue={product.categoria || ''} placeholder="Categoría" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input name="texto_oferta" defaultValue={product.texto_oferta || ''} placeholder="Texto de Oferta" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#666' }}>Imágenes del producto</label>
          <input name="imageUrl" defaultValue={product.imageUrl} placeholder="Imagen Principal URL" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '10px' }} />
          <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} placeholder="Imagen Secundaria URL" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#007bff', fontWeight: 'bold' }}>Video del Producto</label>
          <input name="videoUrl" defaultValue={product.videoUrl || ''} placeholder="URL del Video" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '2px solid #007bff' }} />
        </div>

        <textarea name="galleryImages" defaultValue={product.galleryImages?.join(', ') || ''} placeholder="Galería de imágenes" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '80px', marginBottom: '20px' }} />

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <BooleanSelectEdit name="es_mas_vendido" label="¿Es Más Vendido?" defaultValue={product.es_mas_vendido} />
          <BooleanSelectEdit name="es_destacado_semana" label="¿Destacado Semana?" defaultValue={product.es_destacado_semana} />
          <BooleanSelectEdit name="es_destacado_hogar" label="¿Destacado Hogar?" defaultValue={product.es_destacado_hogar} />
        </div>

        <button type="submit" className="admin-submit-btn" style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          GUARDAR CAMBIOS
        </button>
      </form>

      <section style={{ marginTop: '50px', backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
        <h2>Añadir Características</h2>
        <form action={createCaracteristica} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="hidden" name="producto_id" value={product.id} />
          <input name="titulo" required placeholder="Título" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <textarea name="descripcion" placeholder="Descripción" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            + AÑADIR
          </button>
        </form>

        <div style={{ marginTop: '30px' }}>
          {product.caracteristicas?.map((c: Caracteristica) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#fff', marginBottom: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
              <div>
                <strong>{c.titulo}</strong>
                <p>{c.descripcion}</p>
              </div>
              <DeleteCaracteristicaButton id={c.id} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}