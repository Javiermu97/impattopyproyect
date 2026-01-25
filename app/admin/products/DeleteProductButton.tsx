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
          alert('Error al eliminar.');
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending} 
      style={{
        backgroundColor: 'transparent',
        color: '#dc3545',
        border: '1px solid #dc3545',
        padding: '5px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '700',
        cursor: isPending ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#dc3545'; e.currentTarget.style.color = '#fff'; }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#dc3545'; }}
    >
      {isPending ? '...' : 'ELIMINAR'}
    </button>
  );
}