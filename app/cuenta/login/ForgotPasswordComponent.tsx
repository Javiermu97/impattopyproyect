'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordComponent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/cuenta/reset-password`,
      });

      if (error) throw error;

      setMessage('Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.');

    } catch (err) {
      // ✅ CORRECCIÓN: Manejamos el error de forma segura
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo enviar el enlace de recuperación.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRecovery = () => {
    alert(
      'Función no implementada.\n\n' +
      'Para activar esto, se necesita un servicio de backend que conecte con la API de WhatsApp (ej. Twilio).'
    );
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1 className="auth-title">Recuperar Contraseña</h1>
        <p className="auth-subtitle">
          Ingresa tu correo para recibir instrucciones.
        </p>

        {!message ? (
          <form onSubmit={handlePasswordReset} className="auth-grid">
            <label className="auth-label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tucorreo@dominio.com"
              required
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <button type="submit" className="auth-primary" disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar por Correo'}
            </button>
            
            <button type="button" className="auth-google" onClick={handleWhatsAppRecovery}>
              Enviar por WhatsApp (requiere teléfono registrado)
            </button>

            {error && <p className="auth-note" style={{ color: '#b91c1c' }}>{error}</p>}
          </form>
        ) : (
          <p className="auth-note" style={{ color: 'green', fontWeight: 'bold' }}>
            {message}
          </p>
        )}

        <div className="auth-links" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <Link href="/cuenta/login" className="auth-link">Volver a Iniciar Sesión</Link>
        </div>
      </div>
    </div>
  );
}