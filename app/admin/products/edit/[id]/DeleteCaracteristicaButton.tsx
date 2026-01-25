'use client';

import { deleteCaracteristica } from '@/app/admin/actions';
import { useTransition } from 'react';

export default function DeleteCaracteristicaButton({
  id,
}: {
  id: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Usamos una confirmación nativa más limpia
    if (window.confirm('¿Seguro que deseas eliminar esta característica?')) {
      startTransition(async () => {
        await deleteCaracteristica(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      style={{
        backgroundColor: isPending ? '#eea3ad' : '#dc3545',
        color: 'white',
        padding: '6px 14px',
        borderRadius: '4px',
        border: 'none',
        cursor: isPending ? 'not-allowed' : 'pointer',
        fontSize: '12px',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        marginLeft: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
      onMouseOver={(e) => !isPending && (e.currentTarget.style.backgroundColor = '#bb2d3b')}
      onMouseOut={(e) => !isPending && (e.currentTarget.style.backgroundColor = '#dc3545')}
    >
      {isPending ? 'BORRANDO...' : 'ELIMINAR'}
    </button>
  );
}