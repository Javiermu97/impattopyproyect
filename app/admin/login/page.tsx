'use client';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setIsLoggingIn(false);
        alert('Error: ' + error.message);
        return;
      }
      router.refresh();
      setTimeout(() => { window.location.href = '/admin'; }, 100);
    } catch (err) {
      setIsLoggingIn(false);
      alert('Error inesperado.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '70vh', // Esto evita que toque el footer
      padding: '40px 20px' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '380px', 
        backgroundColor: '#fff', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', fontWeight: '700' }}>Admin Login</h1>
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoggingIn}
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: '#000', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '700', 
              cursor: 'pointer',
              marginTop: '10px'
            }} 
          >
            {isLoggingIn ? 'Cargando...' : 'Entrar al Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}