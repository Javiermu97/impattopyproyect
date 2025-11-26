import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation'; // ✅ CORREGIDO: 'redirect' eliminado
import { updateProduct, createCaracteristica, deleteCaracteristica } from '../../../actions';

// --- Interface para definir la forma de una Característica ---
interface Caracteristica {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  orden: number;
  // Añade aquí cualquier otra propiedad que falte de tu tabla
}

// --- Función para obtener el producto y sus características ORDENADAS ---
async function getProduct(id: number) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('productos')
    .select('*, caracteristicas (*)')
    .eq('id', id)
    // CORRECCIÓN: Añadimos el ordenamiento de las características
    .order('orden', { referencedTable: 'caracteristicas', ascending: true })
    .single();
  return data;
}

// --- Componente para los selectores booleanos (True/False/Nulo) ---
const BooleanSelectEdit = ({ name, label, defaultValue }: { name: string, label: string, defaultValue: boolean | null | undefined }) => {
    const valueToString = (val: boolean | null | undefined) => {
        if (val === true) return 'true';
        if (val === false) return 'false';
        return 'null';
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}:</label>
            <select id={name} name={name} defaultValue={valueToString(defaultValue)} className="form-input">
                <option value="null">NULO</option>
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
            </select>
        </div>
    );
};

// --- Componente Principal de la Página de Edición ---
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // <-- Volvemos a 'esperar' los params
  const productId = Number(id);
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, product.id);
  
  return (
    <div className="admin-container">
      <h1>Editar Producto: {product.name}</h1>
      
      {/* ===== FORMULARIO PRINCIPAL DEL PRODUCTO (RESTAURADO) ===== */}
      <form action={updateProductWithId} className="admin-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">name:</label>
          <input id="name" name="name" type="text" required className="form-input" defaultValue={product.name || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">description:</label>
          <textarea id="description" name="description" className="form-textarea" defaultValue={product.description || ''} />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="price" className="form-label">price:</label>
            <input id="price" name="price" type="number" required className="form-input" defaultValue={product.price || 0} />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice" className="form-label">oldPrice:</label>
            <input id="oldPrice" name="oldPrice" type="number" className="form-input" defaultValue={product.oldPrice || ''} />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">imageUrl:</label>
            <input id="imageUrl" name="imageUrl" type="text" className="form-input" defaultValue={product.imageUrl || ''} />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">imageUrl2:</label>
            <input id="imageUrl2" name="imageUrl2" type="text" className="form-input" defaultValue={product.imageUrl2 || ''} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">videoUrl:</label>
          <input id="videoUrl" name="videoUrl" type="text" className="form-input" defaultValue={product.videoUrl || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">galleryImages (URLs separadas por comas):</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" defaultValue={product.galleryImages?.join(', ') || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="categoria" className="form-label">categoria:</label>
            <input id="categoria" name="categoria" type="text" className="form-input" defaultValue={product.categoria || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">texto_oferta:</label>
          <input id="texto_oferta" name="texto_oferta" type="text" className="form-input" defaultValue={product.texto_oferta || ''} />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked={product.inStock} />
            <label htmlFor="inStock">inStock</label>
          </div>
        </fieldset>
        <div className="form-grid">
            <BooleanSelectEdit name="es_mas_vendido" label="es_mas_vendido" defaultValue={product.es_mas_vendido} />
            <BooleanSelectEdit name="es_destacado_semana" label="es_destacado_semana" defaultValue={product.es_destacado_semana} />
            <BooleanSelectEdit name="es_destacado_hogar" label="es_destacado_hogar" defaultValue={product.es_destacado_hogar} />
        </div>
        <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
      </form>

      <hr className="admin-divider" />

      

      {/* ===== SECCIÓN PARA GESTIONAR CARACTERÍSTICAS ===== */}
      <div className="admin-section">
        <h2>Gestionar Características</h2>

        <div className="admin-form-container">
          <h3>Añadir Nueva Característica</h3>
          <form action={createCaracteristica} className="admin-form">
            <input type="hidden" name="producto_id" value={product.id} />
            <div className="form-group">
              <label htmlFor="titulo" className="form-label">titulo:</label>
              <input id="titulo" name="titulo" type="text" required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion" className="form-label">descripcion:</label>
              <textarea id="descripcion" name="descripcion" className="form-textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="imagen" className="form-label">imagen:</label>
              <input id="imagen" name="imagen" type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="orden" className="form-label">orden:</label>
              <input id="orden" name="orden" type="number" className="form-input" />
            </div>
            <button type="submit" className="admin-submit-btn">Añadir Característica</button>
          </form>
        </div>

        <div className="admin-list-container">
          <h3>Características Actuales</h3>
          {Array.isArray(product.caracteristicas) && product.caracteristicas.length > 0 ? (
            <ul className="admin-list">
              {product.caracteristicas.map((caracteristica: Caracteristica) => (
                <li key={caracteristica.id} className="admin-list-item">
                  <div className="item-info">
                    {caracteristica.imagen && (
                      <Image src={caracteristica.imagen} alt={caracteristica.titulo} width={60} height={60} className="item-image" />
                    )}
                    <div>
                      <p className="item-title">{caracteristica.orden ? `${caracteristica.orden}. ` : ''}{caracteristica.titulo}</p>
                      <p className="item-description">{caracteristica.descripcion}</p>
                    </div>
                  </div>
                  <form action={deleteCaracteristica.bind(null, caracteristica.id, product.id)}>
                    <button type="submit" className="delete-btn small">Eliminar</button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p>Este producto no tiene características todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}
