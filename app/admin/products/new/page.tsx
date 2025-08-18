import { createProduct } from '../../actions'; // Usaremos la acción del admin general

export default function NewProductPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Añadir Nuevo Producto</h1>
      <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Nombre del Producto:
          <input name="name" type="text" required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Precio:
          <input name="price" type="number" required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Descripción:
          <textarea name="description" required style={{ width: '100%', padding: '8px', minHeight: '100px' }} />
        </label>
        <label>
          URL de la Imagen Principal:
          <input name="imageUrl" type="text" required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          <input name="inStock" type="checkbox" defaultChecked /> En Stock
        </label>
        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Guardar Producto
        </button>
      </form>
    </div>
  );
}