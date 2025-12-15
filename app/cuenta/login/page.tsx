'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push('/admin');
    } else {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSignIn} className="admin-form">
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Contraseña</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Contraseña" 
            required 
            className="form-input"
          />
        </div>
        <button type="submit" className="admin-submit-btn">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}