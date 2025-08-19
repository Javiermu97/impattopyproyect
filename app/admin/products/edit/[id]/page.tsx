import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { updateProduct } from '../../../actions';

type Props = { params: Promise<{ id: string }> };

async function getProduct(id: number) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('products').select('*').eq('id', id).single();
  return data;
}

const BooleanSelectEdit = ({ name, label, value }: { name: string, label: string, value: boolean | null }) => {
    const defaultValue = value === true ? 'true' : value === false ? 'false' : 'null';
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}:</label>
            <select id={name} name={name} defaultValue={defaultValue} className="form-input">
                <option value="null">NULO</option>
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
            </select>
        </div>
    );
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="admin-container">
      <h1>Editar Producto: {product.nombre}</h1>
      <form action={updateProductWithId} className="admin-form">
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
          <input id="nombre" name="nombre" type="text" defaultValue={product.nombre || ''} required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea id="descripcion" name="descripcion" defaultValue={product.descripcion || ''} className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input id="precio" name="precio" type="number" defaultValue={product.precio || ''} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="precio_anterior" className="form-label">Precio Anterior</label>
            <input id="precio_anterior" name="precio_anterior" type="number" defaultValue={product.precio_anterior || ''} className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL de Imagen Principal</label>
            <input id="imageUrl" name="imageUrl" type="text" defaultValue={product.imageUrl || ''} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">URL de Imagen Secundaria</label>
            <input id="imageUrl2" name="imageUrl2" type="text" defaultValue={product.imageUrl2 || ''} className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">URL del Video</label>
          <input id="videoUrl" name="videoUrl" type="text" defaultValue={product.videoUrl || ''} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">Galería de Imágenes (URLs separadas por comas)</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" defaultValue={product.galleryImages?.join(', ') || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="categorias" className="form-label">Categorías</label>
            <input id="categorias" name="categorias" type="text" defaultValue={product.categorias || ''} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">Texto de Oferta</label>
          <input id="texto_oferta" name="texto_oferta" type="text" defaultValue={product.texto_oferta || ''} className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked={product.inStock} />
            <label htmlFor="inStock">En Stock</label>
          </div>
        </fieldset>
        <div className="form-grid">
            <BooleanSelectEdit name="es_mas_vendido" label="Es Más Vendido" value={product.es_mas_vendido} />
            <BooleanSelectEdit name="es_destacado" label="Es Destacado" value={product.es_destacado} />
            <BooleanSelectEdit name="es_destacado_semana" label="Es Destacado (Semana)" value={product.es_destacado_semana} />
            <BooleanSelectEdit name="es_destacado_hogar" label="Es Destacado (Hogar)" value={product.es_destacado_hogar} />
        </div>
        <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
      </form>
    </div>
  );
}