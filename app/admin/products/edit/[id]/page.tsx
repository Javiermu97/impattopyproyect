import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { updateProduct } from '../../../actions';

type Props = { params: Promise<{ id: string }> };

async function getProduct(id: number) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('productos').select('*').eq('id', id).single();
  return data;
}

const BooleanSelectEdit = ({ name, label, value }: { name: string; label: string; value: boolean | null; }) => {
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

  if (!product) { notFound(); }

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="admin-container">
      <h1>Editar Producto: {product.name}</h1>
      <form action={updateProductWithId} className="admin-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">name:</label>
          <input id="name" name="name" type="text" defaultValue={product.name || ''} required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">description:</label>
          <textarea id="description" name="description" defaultValue={product.description || ''} className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="price" className="form-label">price:</label>
            <input id="price" name="price" type="number" defaultValue={product.price || ''} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice" className="form-label">oldPrice:</label>
            <input id="oldPrice" name="oldPrice" type="number" defaultValue={product.oldPrice || ''} className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">imageUrl:</label>
            <input id="imageUrl" name="imageUrl" type="text" defaultValue={product.ImageUrl || ''} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">imageUrl2:</label>
            <input id="imageUrl2" name="imageUrl2" type="text" defaultValue={product.ImageUrl2 || ''} className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">videoUrl:</label>
          <input id="videoUrl" name="videoUrl" type="text" defaultValue={product.videoUrl || ''} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">galleryImages:</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" defaultValue={product.galleryImages?.join(', ') || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="categoria" className="form-label">categoria:</label>
            <input id="categoria" name="categoria" type="text" defaultValue={product.categoria || ''} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">texto_oferta:</label>
          <input id="texto_oferta" name="texto_oferta" type="text" defaultValue={product.texto_oferta || ''} className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked={product.inStock} />
            <label htmlFor="inStock">inStock</label>
          </div>
        </fieldset>
        <div className="form-grid">
            <BooleanSelectEdit name="es_mas_vendido" label="es_mas_vendido" value={product.es_mas_vendido} />
            <BooleanSelectEdit name="es_destacado_semana" label="es_destacado_semana" value={product.es_destacado_semana} />
            <BooleanSelectEdit name="es_destacado_hogar" label="es_destacado_hogar" value={product.es_destacado_hogar} />
        </div>
        <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
      </form>
    </div>
  );
}