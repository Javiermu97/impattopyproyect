'use client';
import { deleteProduct } from '../actions';

export default function DeleteProductButton({ productId }: { productId: number }) {
  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
      try {
        await deleteProduct(productId);
        alert('Producto eliminado con éxito.');
      } catch (error) {
        alert('Error al eliminar el producto.');
      }
    }
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}>
      Eliminar
    </button>
  );
}