'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface PedidoData {
  pagado: boolean;
  cancelado: boolean;
  monto?: string;
  forma_pago?: string;
  mensaje_resultado_pago?: { titulo: string };
}

export default function PagoExitosoPage() {
  const params = useParams();
  const hashPedido = params?.hash as string ?? '';

  const [pedido, setPedido] = useState<PedidoData | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!hashPedido) {
      setCargando(false);
      return;
    }

    fetch('/api/pagopar/estado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hashPedido }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Estado pedido:', data);
        const resultado = data?.resultado?.[0] ?? null;
        setPedido(resultado);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error consultando estado:', err);
        setCargando(false);
      });
  }, [hashPedido]);

  const pagado = pedido?.pagado === true;
  const cancelado = pedido?.cancelado === true;
  const pendiente = !pagado && !cancelado;

  if (cargando) {
    return (
      <div className="pago-result-container">
        <div className="pago-result-card">
          <h1>Verificando pago...</h1>
          <p>Por favor esperá un momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-result-container">
      <div className={`pago-result-card ${pagado ? 'success' : cancelado ? 'cancelled' : ''}`}>

        {pagado && (
          <>
            <div className="pago-result-icon">✓</div>
            <h1>¡Pago realizado con éxito!</h1>
            <p>Tu pedido fue confirmado y está siendo procesado.</p>
            {pedido?.monto && (
              <p><strong>Monto:</strong> Gs. {parseFloat(pedido.monto).toLocaleString('es-PY')}</p>
            )}
            {pedido?.forma_pago && (
              <p><strong>Medio de pago:</strong> {pedido.forma_pago}</p>
            )}
          </>
        )}

        {cancelado && (
          <>
            <div className="pago-result-icon cancelled">✕</div>
            <h1>Pago cancelado</h1>
            <p>No se realizó ningún cobro. Podés intentarlo de nuevo.</p>
          </>
        )}

        {pendiente && (
          <>
            <div className="pago-result-icon" style={{ background: '#f39c12' }}>⏳</div>
            <h1>Pago pendiente</h1>
            <p>Tu pedido está pendiente de confirmación de pago.</p>
            {pedido?.mensaje_resultado_pago?.titulo && (
              <p>{pedido.mensaje_resultado_pago.titulo}</p>
            )}
          </>
        )}

        <p className="pago-result-sub">
          Si tenés dudas, escribinos por WhatsApp y te ayudamos.
        </p>

        <div className="pago-result-actions">
          <Link href="/">
            <button className="btn-primary">VOLVER AL INICIO</button>
          </Link>
          <a href="https://wa.me/595983491155" target="_blank" rel="noopener noreferrer">
            <button className="btn-secondary">CONTACTAR POR WHATSAPP</button>
          </a>
        </div>
      </div>
    </div>
  );
}
