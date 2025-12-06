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
      <label>{label}</label>
      <select name={name} defaultValue={valueToString(defaultValue)}>
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
  params: { id: string };
}) {
  const productId = Number(params.id);
  const product = await getProduct(productId);

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="admin-container">
      <h1>Editar Producto: {product.name}</h1>

      {/* ===== FORM PRODUCTO ===== */}
      <form action={updateProductWithId} className="admin-form">
        <input name="name" defaultValue={product.name} required />
        <input name="price" type="number" defaultValue={product.price} required />
        <input name="oldPrice" type="number" defaultValue={product.oldPrice || ''} />

        <input name="imageUrl" defaultValue={product.imageUrl} />
        <input name="imageUrl2" defaultValue={product.imageUrl2 || ''} />
        <input name="videoUrl" defaultValue={product.videoUrl || ''} />
        <textarea
          name="galleryImages"
          defaultValue={product.galleryImages?.join(', ') || ''}
        />

        <input type="checkbox" name="inStock" defaultChecked={product.inStock} />

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

        <button type="submit">Actualizar</button>
      </form>

      <hr />

      {/* ===== CARACTERÍSTICAS ===== */}
      <form action={createCaracteristica}>
        <input type="hidden" name="producto_id" value={product.id} />
        <input name="titulo" required />
        <textarea name="descripcion" />
        <input name="imagen" />
        <input name="orden" type="number" />
        <button>Añadir</button>
      </form>

      <ul>
        {product.caracteristicas?.map((c: Caracteristica) => (
          <li key={c.id}>
            {c.imagen && (
              <Image src={c.imagen} alt={c.titulo} width={50} height={50} />
            )}
            <strong>{c.titulo}</strong>

            ✅✅✅ AQUÍ YA VA CORREGIDO ✅✅✅
            <DeleteCaracteristicaButton
              id={c.id}
              productoId={product.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

