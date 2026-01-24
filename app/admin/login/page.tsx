'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      // ✅ Forzamos la actualización de cookies y esperamos un instante
      router.refresh();
      setTimeout(() => {
        window.location.href = '/admin'; // Redirección completa para limpiar el estado
      }, 500);
    } else {
      setIsLoggingIn(false);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSignIn} className="admin-form">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            className="form-input"
            disabled={isLoggingIn}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Contraseña" 
            required 
            className="form-input"
            disabled={isLoggingIn}
          />
        </div>
        <button type="submit" className="admin-submit-btn" disabled={isLoggingIn}>
          {isLoggingIn ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}