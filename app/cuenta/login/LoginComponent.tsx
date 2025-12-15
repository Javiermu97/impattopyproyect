'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // ✅ IMPORTANTE

// =======================
// GOOGLE LOGIN (SUPABASE)
// =======================
function GoogleButton() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/cuenta`,
      },
    });
  };

  return (
    <button
      type="button"
      className="auth-google"
      onClick={signIn}
      aria-label="Iniciar sesión con Google"
    >
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

// =======================
// LOGIN EMAIL / PASSWORD
// =======================
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) throw error;

      router.replace('/cuenta');
    } catch (error) {
      if (error instanceof Error) setErr(error.message);
      else setErr('No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoogleButton />

      <div className="auth-sep">o</div>

      <form onSubmit={handleEmailLogin} className="auth-grid">
        <label className="auth-label">Correo electrónico</label>
        <input
          type="email"
          required
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label">Contraseña</label>
        <input
          type="password"
          required
          className="auth-input"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <div className="auth-actions">
          <Link href="/cuenta/forgot" className="auth-link">
            Olvidé mi contraseña
          </Link>
        </div>

        <button className="auth-primary" disabled={loading}>
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>

        {err && <p className="auth-note error">{err}</p>}
      </form>
    </>
  );
}

// =======================
// COMPONENTE PRINCIPAL
// =======================
export default function LoginComponent() {
  const searchParams = useSearchParams();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('redirected') === 'true') {
      setShowRedirectMessage(true);
    }
  }, [searchParams]);

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>
        <p className="auth-subtitle">Bienvenido de nuevo</p>

        {showRedirectMessage && (
          <div className="auth-note">
            Debes iniciar sesión para continuar.
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
