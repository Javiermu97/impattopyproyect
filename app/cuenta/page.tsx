'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

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

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // === VERIFICACIÓN DE SESIÓN ===
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

  if (loading || !user)
    return (
      <div className="w-full flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#A78D5A] rounded-full"></div>
      </div>
    );

  const displayName =
    user.user_metadata?.nombre ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0];

  return (
    <div className="account-container">
      
      {/* SIDEBAR */}
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="account-main">

        {/* MI CUENTA */}
        {active === 'account' && (
          <div className="panel">
            <h2>Información de la cuenta</h2>
            <div className="info-box">
              <p><strong>Nombre:</strong> {displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        )}

        {/* MIS PEDIDOS */}
        {active === 'orders' && (
          <div className="panel">
            <h2>Mis pedidos</h2>
            <div className="info-box">
              <p>No tienes pedidos registrados aún.</p>
              <p className="small-text">Cuando realices compras, aparecerán aquí.</p>
            </div>
          </div>
        )}

        {/* DESCARGAS */}
        {active === 'downloads' && (
          <div className="panel">
            <h2>Descargas disponibles</h2>
            <div className="info-box">
              <p>No tienes productos descargables.</p>
            </div>
          </div>
        )}

        {/* FAVORITOS */}
        {active === 'wishlist' && (
          <div className="panel">
            <h2>Mi lista de favoritos</h2>
            <div className="info-box">
              <p>No agregaste ningún producto aún.</p>
            </div>
          </div>
        )}

        {/* DIRECCIONES */}
        {active === 'addresses' && (
          <div className="panel">
            <h2>Libreta de direcciones</h2>
            <div className="info-box">
              <p>No tienes direcciones guardadas.</p>
              <button className="primary-btn">Agregar dirección</button>
            </div>
          </div>
        )}

        {/* INFORMACIÓN DE LA CUENTA */}
        {active === 'info' && (
          <div className="panel">
            <h2>Editar información</h2>
            <div className="info-box form-box">
              <label>Nombre completo</label>
              <input type="text" defaultValue={displayName} />

              <label>Email</label>
              <input type="text" defaultValue={user.email} disabled />

              <button className="primary-btn">Guardar cambios</button>
            </div>
          </div>
        )}

        {/* CRÉDITO */}
        {active === 'credit' && (
          <div className="panel">
            <h2>Crédito de tienda</h2>
            <div className="info-box">
              <p>Saldo disponible: 0 Gs.</p>
            </div>
          </div>
        )}

        {/* MÉTODOS DE PAGO */}
        {active === 'payments' && (
          <div className="panel">
            <h2>Métodos de pago</h2>
            <div className="info-box">
              <p>No tienes tarjetas guardadas.</p>
              <button className="primary-btn">Agregar método de pago</button>
            </div>
          </div>
        )}

        {/* TARJETAS DE REGALO */}
        {active === 'giftcard' && (
          <div className="panel">
            <h2>Tarjetas de regalo</h2>
            <div className="info-box">
              <p>No tienes tarjetas asociadas.</p>
            </div>
          </div>
        )}

        {/* PUNTOS */}
        {active === 'points' && (
          <div className="panel">
            <h2>Puntos acumulados</h2>
            <div className="info-box">
              <p>Tus puntos actuales: <strong>0</strong></p>
            </div>
          </div>
        )}

        {/* RESEÑAS */}
        {active === 'reviews' && (
          <div className="panel">
            <h2>Mis reseñas</h2>
            <div className="info-box">
              <p>No has hecho reseñas todavía.</p>
            </div>
          </div>
        )}

        {/* NEWSLETTER */}
        {active === 'newsletter' && (
          <div className="panel">
            <h2>Suscripciones</h2>
            <div className="info-box">
              <p>No estás suscrito al boletín.</p>
              <button className="primary-btn">Suscribirme</button>
            </div>
          </div>
        )}

        {/* INVITACIONES */}
        {active === 'invites' && (
          <div className="panel">
            <h2>Mis invitaciones</h2>
            <div className="info-box">
              <p>No tienes invitaciones enviadas.</p>
            </div>
          </div>
        )}

        {/* REGISTRO DE REGALOS */}
        {active === 'registry' && (
          <div className="panel">
            <h2>Registro de regalos</h2>
            <div className="info-box">
              <p>No tienes un registro creado.</p>
              <button className="primary-btn">Crear registro</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}


