'use client';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  // ✅ Cliente actualizado para ser compatible con la nueva librería
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoggingIn(false);
        alert('Error al iniciar sesión: ' + error.message);
        return;
      }

      // ✅ Refrescamos para que Next.js detecte la nueva cookie de sesión
      router.refresh();

      // ✅ Redirección limpia al panel de administración
      setTimeout(() => {
        window.location.href = '/admin';
      }, 100);

    } catch (err) {
      setIsLoggingIn(false);
      console.error(err);
      alert('Ocurrió un error inesperado.');
    }
  };

  return (
    <div className="admin-container" style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Login</h1>
      <form onSubmit={handleSignIn} className="admin-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="admin@ejemplo.com" 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            disabled={isLoggingIn}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********" 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            disabled={isLoggingIn}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            opacity: isLoggingIn ? 0.7 : 1
          }} 
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Iniciando sesión...' : 'Entrar al Panel'}
        </button>
      </form>
    </div>
  );
}