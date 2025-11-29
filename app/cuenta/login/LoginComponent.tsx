'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleButton() {
  const signIn = () => {
    // ✅ CLAVE: Apuntamos a TU ruta manual para mantener "Impatto.com.py"
    window.location.href = "/api/auth/google/start";
  };

  return (
    <button type="button" className="auth-google" onClick={signIn} aria-label="Iniciar sesión con Google">
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={18}
        height={18}
      />
      <span>Iniciar sesión con Google</span>
    </button>
  );
}

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (error) throw error;
      
      // Refrescar para que Next.js detecte la cookie nueva
      router.refresh();
      router.push('/cuenta');
    } catch (error) {
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr('No se pudo iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoogleButton />
      <div className="auth-sep">o</div>
      <form onSubmit={handleEmailLogin} className="auth-grid">
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
        <label className="auth-label" htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          type="password"
          placeholder="••••••••"
          required
          className="auth-input"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="auth-actions">
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" /> Recordarme
          </label>
          <Link href="/cuenta/forgot" className="auth-link">Olvidé mi contraseña</Link>
        </div>
        <button type="submit" className="auth-primary" disabled={loading}>
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
        {err && <p className="auth-note" style={{ color: '#b91c1c' }}>{err}</p>}
      </form>
    </>
  );
};

// --- (El resto del componente RegisterForm y export default se mantiene igual) ---
// (Si necesitas que te copie RegisterForm también avísame, pero es el mismo de siempre)

export default function LoginComponent() {
  const [isLoginView, setIsLoginView] = useState(true);
  const searchParams = useSearchParams();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('redirected') === 'true') setShowRedirectMessage(true);
  }, [searchParams]);

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1 className="auth-title">{isLoginView ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p className="auth-subtitle">
          {isLoginView ? 'Bienvenido de nuevo' : 'Completa tus datos para registrarte'}
        </p>

        {showRedirectMessage && (
          <div className="auth-note" style={{ color: '#0d47a1', fontWeight: 600 }}>
            Debes iniciar sesión o registrarte para agregar elementos a tu lista de deseos.
          </div>
        )}

        <div className="auth-links" style={{ justifyContent: 'center', marginTop: '.75rem' }}>
          <button
            className="auth-google"
            onClick={() => setIsLoginView(true)}
            style={{ width: 'auto', padding: '.4rem .8rem', borderRadius: 9999, borderColor: isLoginView ? '#0d47a1' : '#d1d5db', fontWeight: isLoginView ? 700 : 500 }}
          >
            Iniciar sesión
          </button>
          <button
            className="auth-google"
            onClick={() => setIsLoginView(false)}
            style={{ width: 'auto', padding: '.4rem .8rem', borderRadius: 9999, borderColor: !isLoginView ? '#0d47a1' : '#d1d5db', fontWeight: !isLoginView ? 700 : 500 }}
          >
            Registrarme
          </button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {isLoginView ? <LoginForm /> : <RegisterForm />}
        </div>
         {isLoginView ? (
          <p className="auth-note" style={{ marginTop: '1rem' }}>
            ¿No tienes cuenta? <button className="auth-link" onClick={() => setIsLoginView(false)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Regístrate</button>
          </p>
        ) : (
          <p className="auth-note" style={{ marginTop: '1rem' }}>
            ¿Ya tienes cuenta? <button className="auth-link" onClick={() => setIsLoginView(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Inicia sesión</button>
          </p>
        )}
      </div>
    </div>
  );
}
// (Agrega el componente RegisterForm que ya tenías abajo si falta)
const RegisterForm = () => { 
    // ... Tu código de registro existente ...
    return <div>(Formulario de Registro)</div>; // Solo para ahorrar espacio aquí, usa el tuyo.
};