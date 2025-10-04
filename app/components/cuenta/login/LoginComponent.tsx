// /app/cuenta/login/Component.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm = () => {
  // Aquí irá la lógica para el login con email y contraseña
  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Funcionalidad de login con email pendiente.');
  };
  return (
    <form onSubmit={handleEmailLogin}>
      {/* ... (Aquí puedes añadir un botón de Google Login si lo configuras en Supabase) ... */}
      <input type="email" placeholder="Correo electrónico" required className="auth-input" />
      <input type="password" placeholder="Contraseña" required className="auth-input" />
      <div className="auth-options">
        <label><input type="checkbox" /> Recordarme</label>
        <a href="#">Lo olvidé</a>
      </div>
      <button type="submit" className="auth-submit-btn">Iniciar sesión</button>
    </form>
  );
};

const RegisterForm = () => {
  // Aquí irá la lógica para registrar un nuevo usuario
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Funcionalidad de registro pendiente.');
  };
  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Nombre *" required className="auth-input" />
      <input type="text" placeholder="Apellido *" required className="auth-input" />
      <input type="email" placeholder="Correo electrónico *" required className="auth-input" />
      <input type="password" placeholder="Contraseña *" required className="auth-input" />
      <input type="password" placeholder="Confirmar Contraseña *" required className="auth-input" />
      <button type="submit" className="auth-submit-btn">Crear una cuenta</button>
    </form>
  );
};

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const searchParams = useSearchParams();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    // Muestra el mensaje de alerta si venimos redirigidos desde la lista de deseos
    if (searchParams.get('redirected') === 'true') {
      setShowRedirectMessage(true);
    }
  }, [searchParams]);

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        {showRedirectMessage && (
          <div className="auth-alert">
            Debes iniciar sesión o registrarte para agregar elementos a tu lista de deseos.
          </div>
        )}
        <div className="auth-tabs">
          <button onClick={() => setIsLoginView(true)} className={isLoginView ? 'active' : ''}>Iniciar sesion</button>
          <button onClick={() => setIsLoginView(false)} className={!isLoginView ? 'active' : ''}>Registrarme</button>
        </div>
        {isLoginView ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}