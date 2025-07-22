'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // Lógica para enviar el email a tu servicio de newsletter
      console.log('Email suscrito:', email);
      setMessage('¡Gracias por suscribirte!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Por favor, introduce un email válido.');
    }
  };

  return (
    // Este formulario utiliza las clases .footer-col form que ya existen en tu globals.css
    <form onSubmit={handleSubmit}>
      <h3>Suscríbete para recibir ofertas</h3>
      <p>Recibe nuestras últimas novedades y ofertas especiales directamente en tu bandeja de entrada.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        required
      />
      {/* Este botón utiliza la clase .btn-subscribe que ya existe en tu globals.css */}
      <button type="submit" className="btn-subscribe">Suscribirse</button>
      {message && <p className="subscribe-message">{message}</p>}
    </form>
  );
}