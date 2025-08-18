import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { updateProduct } from '../../../actions'; // Apuntamos a las acciones del admin

// Esta función obtiene los datos del producto específico del servidor
async function getProduct(id: number) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('products').select('*').eq('id', id).single();
  return data;
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  // Creamos una acción específica para este formulario, pasando el ID.
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Editar Producto: {product.name}</h1>
      <form action={updateProductWithId} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Nombre del Producto:
          <input name="name" type="text" defaultValue={product.name} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Precio:
          <input name="price" type="number" defaultValue={product.price} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Descripción:
          <textarea name="description" defaultValue={product.description} required style={{ width: '100%', padding: '8px', minHeight: '100px' }} />
        </label>
        <label>
          URL de la Imagen Principal:
          <input name="imageUrl" type="text" defaultValue={product.imageUrl} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          <input name="inStock" type="checkbox" defaultChecked={product.inStock} /> En Stock
        </label>
        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}