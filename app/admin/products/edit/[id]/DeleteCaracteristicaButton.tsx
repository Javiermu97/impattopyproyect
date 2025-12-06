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
    const ok = confirm('¿Eliminar esta característica?');
    if (!ok) return;

    startTransition(async () => {
      await deleteCaracteristica(id); // ✅ SOLO 1 PARAMETRO
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      style={{
        background: 'crimson',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
      }}
    >
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
