'use client';

import { deleteProduct } from '../actions';
import { useTransition } from 'react';

export default function DeleteProductButton({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      startTransition(async () => {
        try {
          await deleteProduct(productId);
        } catch (error) {
          // Si la acción del servidor falla, el error se captura aquí
          console.error('Error al eliminar el producto:', error);
          alert('Hubo un problema al eliminar el producto.');
        }
      });
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="delete-btn">
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}