import Link from 'next/link';

export const metadata = {
  title: 'Pago Cancelado - Impatto Py',
  description: 'El pago fue cancelado.',
};

export default function PagoCanceladoPage() {
  return (
    <div className="pago-result-container">
      <div className="pago-result-card cancelled">
        <div className="pago-result-icon cancelled">✕</div>
        <h1>Pago cancelado</h1>
        <p>No se realizó ningún cobro. Podés intentarlo de nuevo cuando quieras.</p>
        <p className="pago-result-sub">
          Si tuviste algún problema con el pago, escribinos por WhatsApp y te ayudamos.
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