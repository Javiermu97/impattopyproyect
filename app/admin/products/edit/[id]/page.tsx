import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { updateProduct, createCaracteristica, deleteCaracteristica } from '../../../actions';

type Props = { params: Promise<{ id: string }> };

async function getProduct(id: number) {
  const supabase = createServerComponentClient({ cookies });
  // Esta consulta ya trae el producto y sus características relacionadas
  const { data } = await supabase
    .from('productos')
    .select('*, caracteristicas(*)')
    .eq('id', id)
    .single();
  return data;
}

// ... (Tu componente BooleanSelectEdit se mantiene igual)

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
      {/* --- FORMULARIO PRINCIPAL DEL PRODUCTO (SIN CAMBIOS) --- */}
      <h1>Editar Producto: {product.name}</h1>
      <form action={updateProductWithId} className="admin-form">
        {/* ... (Todos los campos de tu formulario de producto van aquí, sin cambios) ... */}
        {/* name, description, price, etc. */}
        <button type="submit" className="admin-submit-btn">Actualizar Producto</button>
      </form>

      <hr className="admin-divider" />

      {/* --- SECCIÓN PARA GESTIONAR CARACTERÍSTICAS --- */}
      <div className="admin-section">
        <h2>Gestionar Características</h2>

        {/* --- Formulario para añadir nueva característica --- */}
        <div className="admin-form-container">
          <h3>Añadir Nueva Característica</h3>
          <form action={createCaracteristica} className="admin-form">
            {/* Campo oculto para enviar el ID del producto */}
            <input type="hidden" name="producto_id" value={product.id} />

            <div className="form-group">
              <label htmlFor="titulo" className="form-label">Título:</label>
              <input id="titulo" name="titulo" type="text" required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion" className="form-label">Descripción:</label>
              <textarea id="descripcion" name="descripcion" className="form-textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="imagen" className="form-label">URL de la Imagen:</label>
              <input id="imagen" name="imagen" type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="orden" className="form-label">Orden:</label>
              <input id="orden" name="orden" type="number" className="form-input" />
            </div>
            <button type="submit" className="admin-submit-btn">Añadir Característica</button>
          </form>
        </div>

        {/* --- Lista de características existentes --- */}
        <div className="admin-list-container">
          <h3>Características Actuales</h3>
          {product.caracteristicas && product.caracteristicas.length > 0 ? (
            <ul className="admin-list">
              {product.caracteristicas.map((caracteristica: any) => (
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