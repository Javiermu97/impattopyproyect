// CAMBIO: Importamos la librería base en lugar de auth-helpers
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { updateProduct } from '../../../actions';

type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: number) {
  // CAMBIO: Creamos el cliente de la forma más directa
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase.from('products').select('*').eq('id', id).single();
  return data;
}

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
      <h1>Editar Producto: {product.name}</h1>
      <form action={updateProductWithId} className="admin-form">
        {/* El resto del formulario se mantiene exactamente igual */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nombre del Producto:</label>
          <input id="name" name="name" type="text" defaultValue={product.name || ''} required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Descripción:</label>
          <textarea id="description" name="description" defaultValue={product.description || ''} className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="price" className="form-label">Precio (Gs.):</label>
            <input id="price" name="price" type="number" defaultValue={product.price || ''} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice" className="form-label">Precio Antiguo (Opcional):</label>
            <input id="oldPrice" name="oldPrice" type="number" defaultValue={product.oldPrice || ''} className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL Imagen Principal:</label>
            <input id="imageUrl" name="imageUrl" type="text" defaultValue={product.imageUrl || ''} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">URL Imagen Secundaria (Opcional):</label>
            <input id="imageUrl2" name="imageUrl2" type="text" defaultValue={product.imageUrl2 || ''} className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">URL del Video (Opcional):</label>
          <input id="videoUrl" name="videoUrl" type="text" defaultValue={product.videoUrl || ''} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">Galería de Imágenes (URLs separadas por comas):</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" defaultValue={product.galleryImages?.join(', ') || ''} placeholder="https://.../img1.jpg, https://.../img2.jpg" />
        </div>
        <div className="form-grid">
            <div className="form-group">
                <label htmlFor="categoria" className="form-label">Categoría:</label>
                <input id="categoria" name="categoria" type="text" defaultValue={product.categoria || ''} className="form-input" />
            </div>
            <div className="form-group">
                <label htmlFor="promoSubtitle" className="form-label">Subtítulo de Promoción:</label>
                <input id="promoSubtitle" name="promoSubtitle" type="text" defaultValue={product.promoSubtitle || ''} className="form-input" />
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">Texto de Oferta:</label>
          <input id="texto_oferta" name="texto_oferta" type="text" defaultValue={product.texto_oferta || ''} className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group"><input id="inStock" name="inStock" type="checkbox" defaultChecked={product.inStock} /><label htmlFor="inStock">En Stock</label></div>
          <div className="form-checkbox-group"><input id="es_mas_vendido" name="es_mas_vendido" type="checkbox" defaultChecked={product.es_mas_vendido} /><label htmlFor="es_mas_vendido">Es Más Vendido</label></div>
          <div className="form-checkbox-group"><input id="es_destacado" name="es_destacado" type="checkbox" defaultChecked={product.es_destacado} /><label htmlFor="es_destacado">Destacado (General)</label></div>
          <div className="form-checkbox-group"><input id="es_destacado_semana" name="es_destacado_semana" type="checkbox" defaultChecked={product.es_destacado_semana} /><label htmlFor="es_destacado_semana">Destacado (Semana)</label></div>
          <div className="form-checkbox-group"><input id="es_destacado_hogar" name="es_destacado_hogar" type="checkbox" defaultChecked={product.es_destacado_hogar} /><label htmlFor="es_destacado_hogar">Destacado (Hogar)</label></div>
        </fieldset>
        <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
      </form>
    </div>
  );
}