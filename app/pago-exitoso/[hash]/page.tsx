import Link from 'next/link';
import * as crypto from 'crypto';

export const metadata = {
  title: 'Resultado del Pago - Impatto Py',
};

/*
  Esta página recibe el hash del pedido desde Pagopar
  en la URL: /pago-exitoso/($hash)
  y consulta el estado real del pedido.
*/

async function consultarEstadoPedido(hashPedido: string) {
  try {
    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const publicKey = process.env.NEXT_PUBLIC_PAGOPAR_PUBLIC_KEY!;

    // Token: sha1(private_key + "CONSULTA")
    const token = crypto
      .createHash('sha1')
      .update(`${privateKey}CONSULTA`)
      .digest('hex');

    const res = await fetch('https://api.pagopar.com/api/pedidos/1.1/traer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hash_pedido: hashPedido,
        token,
        token_publico: publicKey,
      }),
      cache: 'no-store',
    });

    const data = await res.json();
    return data?.resultado?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function PagoExitosoPage({
  params,
}: {
  params: { hash: string };
}) {
  const hashPedido = params.hash ?? '';
  const pedido = hashPedido ? await consultarEstadoPedido(hashPedido) : null;

  const pagado = pedido?.pagado === true;
  const cancelado = pedido?.cancelado === true;
  const pendiente = !pagado && !cancelado;

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