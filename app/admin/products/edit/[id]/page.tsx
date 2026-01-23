import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

import {
  updateProduct,
  createCaracteristica,
} from '@/app/admin/actions';

import DeleteCaracteristicaButton from './DeleteCaracteristicaButton';

// ========= TYPES =========
interface Caracteristica {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  orden: number;
}

// ========= SERVER QUERY =========
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

// ========= BOOLEAN SELECT =========
function BooleanSelectEdit({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: boolean | null | undefined;
}) {
  const valueToString = (val: boolean | null | undefined) => {
    if (val === true) return 'true';
    if (val === false) return 'false';
    return 'null';
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select name={name} defaultValue={valueToString(defaultValue)} className="form-input">
        <option value="null">NULO</option>
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
      </select>
    </div>
  );
}

// ✅ ✅ ✅ SERVER COMPONENT ✅ ✅ ✅
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // Se define como Promise para versiones actuales
}) {
  // 1. Esperamos a que los params se resuelvan
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);

  // 2. Buscamos el producto en Supabase
  const product = await getProduct(productId);

  // 3. Si no existe, lanzamos el 404 (esto es lo que pasaba cuando el ID era undefined)
  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="admin-container">
      <h1>Editar Producto: {product.name}</h1>

      {/* ===== FORM PRODUCTO ===== */}
      <section className="form-section">
        <form action={updateProductWithId} className="admin-form">
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input name="name" defaultValue={product.name} required className="form-input" />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Precio Actual</label>
              <input name="price" type="number" defaultValue={product.price} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Precio Anterior</label>
              <input name="oldPrice" type="number" defaultValue={product.oldPrice || ''} className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label>Imagen Principal (URL)</label>
            <input name="imageUrl" defaultValue={product.imageUrl} className="form-input" />
          </div>

          <div className="form-group">
            <label>Galería (Separada por comas)</label>
            <textarea
              name="galleryImages"
              defaultValue={product.galleryImages?.join(', ') || ''}
              className="form-input"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" name="inStock" defaultChecked={product.inStock} />
              En Stock
            </label>
          </div>

          <div className="form-grid">
            <BooleanSelectEdit
              name="es_mas_vendido"
              label="Más vendido"
              defaultValue={product.es_mas_vendido}
            />
            <BooleanSelectEdit
              name="es_destacado_semana"
              label="Destacado Semana"
              defaultValue={product.es_destacado_semana}
            />
            <BooleanSelectEdit
              name="es_destacado_hogar"
              label="Destacado Hogar"
              defaultValue={product.es_destacado_hogar}
            />
          </div>

          <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
        </form>
      </section>

      <hr className="divider" />

      {/* ===== CARACTERÍSTICAS ===== */}
      <section className="caracteristicas-section">
        <h2>Añadir Características</h2>
        <form action={createCaracteristica} className="admin-form add-char-form">
          <input type="hidden" name="producto_id" value={product.id} />
          
          <div className="form-group">
            <input name="titulo" required placeholder="Título de la característica" className="form-input" />
          </div>
          <div className="form-group">
            <textarea name="descripcion" placeholder="Descripción detallada" className="form-input" rows={2} />
          </div>
          <div className="form-grid">
            <input name="imagen" placeholder="URL de la imagen/ícono" className="form-input" />
            <input name="orden" type="number" placeholder="Orden (ej: 1)" defaultValue="0" className="form-input" />
          </div>
          
          <button type="submit" className="admin-submit-btn secondary">Añadir Característica</button>
        </form>

        <div className="caracteristicas-list">
          <h3>Lista de Características Actuales</h3>
          {product.caracteristicas && product.caracteristicas.length > 0 ? (
            <ul>
              {product.caracteristicas.map((c: Caracteristica) => (
                <li key={c.id} className="caracteristica-item">
                  <div className="char-info">
                    {c.imagen && (
                      <Image src={c.imagen} alt={c.titulo} width={40} height={40} className="char-img" />
                    )}
                    <div>
                      <p className="char-title">{c.titulo}</p>
                      <small>Orden: {c.orden}</small>
                    </div>
                  </div>
                  <DeleteCaracteristicaButton id={c.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">Este producto aún no tiene características.</p>
          )}
        </div>
      </section>
    </div>
  );
}

