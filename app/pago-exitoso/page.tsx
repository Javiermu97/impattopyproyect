import Link from 'next/link';

export const metadata = {
  title: 'Pago Exitoso - Impatto Py',
  description: 'Tu pago fue procesado correctamente.',
};

export default function PagoExitosoPage() {
  return (
    <div className="pago-result-container">
      <div className="pago-result-card success">
        <div className="pago-result-icon">✓</div>
        <h1>¡Pago realizado con éxito!</h1>
        <p>Tu pedido fue confirmado y está siendo procesado.</p>
        <p className="pago-result-sub">
          Recibirás un correo de confirmación con los detalles de tu compra.
          Si tenés dudas, escribinos por WhatsApp.
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