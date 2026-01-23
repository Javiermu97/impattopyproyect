import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
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
  const supabase = createClient();
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
    <div className="form-group">
      <label>{label}</label>
      <select name={name} defaultValue={val} className="form-input">
        <option value="null">NULO</option>
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
      </select>
    </div>
  );
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(Number(resolvedParams.id));

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="admin-container">
      <h1>Editar Producto: {product.name}</h1>

      <form action={updateProductWithId} className="admin-form">
        <div className="form-grid">
          <input name="name" defaultValue={product.name} placeholder="Nombre" required />
          <input name="price" type="number" defaultValue={product.price} placeholder="Precio" required />
          <input name="oldPrice" type="number" defaultValue={product.oldPrice || ''} placeholder="Precio Antiguo" />
        </div>

        <div className="form-grid">
          <input name="categoria" defaultValue={product.categoria || ''} placeholder="Categoría" />
          <input name="texto_oferta" defaultValue={product.texto_oferta || ''} placeholder="Texto Oferta" />
        </div>

        <input name="imageUrl" defaultValue={product.imageUrl} placeholder="Imagen Principal URL" />
        <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} placeholder="Imagen Secundaria URL" />
        <textarea name="galleryImages" defaultValue={product.galleryImages?.join(', ') || ''} placeholder="Galería (img1, img2...)" />

        <div className="form-grid">
          <BooleanSelectEdit name="es_mas_vendido" label="Más Vendido" defaultValue={product.es_mas_vendido} />
          <BooleanSelectEdit name="es_destacado_semana" label="Destacado Semana" defaultValue={product.es_destacado_semana} />
          <BooleanSelectEdit name="es_destacado_hogar" label="Destacado Hogar" defaultValue={product.es_destacado_hogar} />
        </div>

        <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
      </form>

      <hr />

      <section className="caracteristicas-section">
        <h2>Añadir Características</h2>
        <form action={createCaracteristica} className="admin-form">
          <input type="hidden" name="producto_id" value={product.id} />
          <input name="titulo" required placeholder="Título (Ej: Material)" className="form-input" />
          <textarea name="descripcion" placeholder="Descripción" className="form-input" />
          <div className="form-grid">
            <input name="imagen" placeholder="URL Imagen/Icono" className="form-input" />
            <input name="orden" type="number" defaultValue="0" className="form-input" />
          </div>
          <button type="submit" className="admin-submit-btn" style={{backgroundColor: '#28a745'}}>Añadir Característica</button>
        </form>

        <div className="lista-caracteristicas">
          <h3>Características Actuales</h3>
          {product.caracteristicas?.length > 0 ? (
            <ul>
              {product.caracteristicas.map((c: Caracteristica) => (
                <li key={c.id} style={{display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '15px'}}>
                  {c.imagen && <Image src={c.imagen} alt={c.titulo} width={40} height={40} />}
                  <span><strong>{c.titulo}</strong> (Orden: {c.orden})</span>
                  <DeleteCaracteristicaButton id={c.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Este producto aún no tiene características.</p>
          )}
        </div>
      </section>
    </div>
  );
}