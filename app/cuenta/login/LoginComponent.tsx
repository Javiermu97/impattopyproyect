'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="auth-google" onClick={onClick} aria-label="Iniciar sesión con Google">
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
      router.push('/');
    } catch (error) {
      // ✅ CORRECCIÓN 1: Manejamos el error de forma segura
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr('No se pudo iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  // ✅ CAMBIO: Leemos la URL directamente de las variables de entorno
  const redirectTo = process.env.NEXT_PUBLIC_SITE_URL;

  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Usamos la variable que acabamos de definir
      redirectTo: redirectTo,
    },
  });
};

  return (
    <>
      <GoogleButton onClick={handleGoogleLogin} />
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

const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    pass: '',
    confirm: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    if (form.pass !== form.confirm) {
      setErr('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.pass,
        options: {
          data: {
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: form.telefono,
          },
        },
      });
      if (error) throw error;
      router.push('/cuenta/login');
    } catch (error) {
      // ✅ CORRECCIÓN 2: Manejamos el error de forma segura
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr('No se pudo registrar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-grid">
      <label className="auth-label" htmlFor="nombre">Nombre *</label>
      <input
        id="nombre"
        className="auth-input"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
      />

      <label className="auth-label" htmlFor="apellido">Apellido *</label>
      <input
        id="apellido"
        className="auth-input"
        value={form.apellido}
        onChange={(e) => setForm({ ...form, apellido: e.target.value })}
        required
      />

      <label className="auth-label" htmlFor="email-r">Correo electrónico *</label>
      <input
        id="email-r"
        type="email"
        className="auth-input"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <label className="auth-label" htmlFor="tel">Teléfono (opcional)</label>
      <input
        id="tel"
        className="auth-input"
        value={form.telefono}
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
      />

      <label className="auth-label" htmlFor="pass-r">Contraseña *</label>
      <input
        id="pass-r"
        type="password"
        className="auth-input"
        value={form.pass}
        onChange={(e) => setForm({ ...form, pass: e.target.value })}
        required
      />

      <label className="auth-label" htmlFor="confirm">Confirmar contraseña *</label>
      <input
        id="confirm"
        type="password"
        className="auth-input"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        required
      />

      <button type="submit" className="auth-primary" disabled={loading}>
        {loading ? 'Creando…' : 'Crear una cuenta'}
      </button>

      {err && <p className="auth-note" style={{ color: '#b91c1c' }}>{err}</p>}
    </form>
  );
};

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
          {isLoginView
            ? 'Bienvenido de nuevo'
            : 'Completa tus datos para registrarte'}
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
            style={{
              width: 'auto',
              padding: '.4rem .8rem',
              borderRadius: 9999,
              borderColor: isLoginView ? '#0d47a1' : '#d1d5db',
              fontWeight: isLoginView ? 700 : 500
            }}
          >
            Iniciar sesión
          </button>
          <button
            className="auth-google"
            onClick={() => setIsLoginView(false)}
            style={{
              width: 'auto',
              padding: '.4rem .8rem',
              borderRadius: 9999,
              borderColor: !isLoginView ? '#0d47a1' : '#d1d5db',
              fontWeight: !isLoginView ? 700 : 500
            }}
          >
            Registrarme
          </button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {isLoginView ? <LoginForm /> : <RegisterForm />}
        </div>

        {isLoginView ? (
          <p className="auth-note" style={{ marginTop: '1rem' }}>
            ¿No tienes cuenta?{' '}
            <button
              className="auth-link"
              onClick={() => setIsLoginView(false)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Regístrate
            </button>
          </p>
        ) : (
          <p className="auth-note" style={{ marginTop: '1rem' }}>
            ¿Ya tienes cuenta?{' '}
            <button
              className="auth-link"
              onClick={() => setIsLoginView(true)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Inicia sesión
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
