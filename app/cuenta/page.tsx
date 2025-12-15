'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

/* --- MENÚ EXACTO AL ESTILO NISSEI --- */
const menuItems = [
  { name: 'Mi Cuenta', key: 'account' },
  { name: 'Mis pedidos', key: 'orders' },
  { name: 'Productos descargables', key: 'downloads' },
  { name: 'Mi lista de favoritos', key: 'wishlist' },
  { name: 'Libreta de direcciones', key: 'addresses' },
  { name: 'Información de la cuenta', key: 'info' },
  { name: 'Crédito de tienda', key: 'credit' },
  { name: 'Métodos de pago almacenados', key: 'payments' },
  { name: 'Tarjeta de regalo', key: 'giftcard' },
  { name: 'Puntos de recompensa', key: 'points' },
  { name: 'Reseñas de mi artículo', key: 'reviews' },
  { name: 'Suscripciones al boletín informativo', key: 'newsletter' },
  { name: 'Mis invitaciones', key: 'invites' },
  { name: 'Mi registro de regalos', key: 'registry' },
];

export default function CuentaPage() {
  const router = useRouter();
  const [active, setActive] = useState('account');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ VERIFICACIÓN CORRECTA CON SUPABASE
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace('/cuenta/login');
        return;
      }

      setUser(data.session.user);
      setLoading(false);
    };

    checkSession();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/cuenta/login');
  };

  if (loading || !user) {
    return (
      <div className="w-full flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#A78D5A] rounded-full"></div>
      </div>
    );
  }

  const displayName =
    user.user_metadata?.nombre ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0];

  return (
    <div className="account-container">
      <aside className="account-sidebar">
        <h3>Mi Cuenta</h3>

        <ul>
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={active === item.key ? 'active' : ''}
              onClick={() => setActive(item.key)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={logout}>
          Cerrar Sesión
        </button>
      </aside>

      <main className="account-main">
        {active === 'account' && (
          <div className="panel">
            <h2>Información de la cuenta</h2>
            <div className="info-box">
              <p><strong>Nombre:</strong> {displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


