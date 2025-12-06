'use client';

import { useTransition } from 'react';
import { deleteCaracteristica } from '@/app/admin/actions';

export default function DeleteCaracteristicaButton({
  id,
  productoId,
}: {
  id: number;
  productoId: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm('¿Eliminar esta característica?')) return;

    startTransition(async () => {
      await deleteCaracteristica(id, productoId);
      location.reload();
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}

