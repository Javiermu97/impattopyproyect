'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

// Opciones menú lateral
const navItems = [
  { name: 'Mi Cuenta', path: 'cuenta', icon: '👤' },
  { name: 'Mis pedidos', path: 'pedidos', icon: '📦' },
  { name: 'Productos descargables', path: 'descargables', icon: '⬇️' },
  { name: 'Mi lista de favoritos', path: 'favoritos', icon: '❤️' },
  { name: 'Libreta de direcciones', path: 'direcciones', icon: '🏠' },
  { name: 'Información de la cuenta', path: 'info', icon: '📝' },
  { name: 'Crédito de tienda', path: 'credito', icon: '💳' },
  { name: 'Métodos de pago almacenados', path: 'pagos', icon: '🔒' },
  { name: 'Tarjeta de regalo', path: 'tarjeta', icon: '🎁' },
  { name: 'Puntos de recompensa', path: 'puntos', icon: '⭐' },
  { name: 'Reseñas de mi artículo', path: 'reseñas', icon: '💬' },
  { name: 'Suscripciones al boletín informativo', path: 'suscripciones', icon: '📧' },
  { name: 'Mis invitaciones', path: 'invitaciones', icon: '💌' },
  { name: 'Mi registro de regalos', path: 'regalos', icon: '🎀' },
];

const AccountInfo = ({ user, handleLogout }: { user: User | null, handleLogout: () => void }) => {
  const meta = user?.user_metadata;
  const name = meta?.full_name || user?.email?.split('@')[0] || "Usuario";

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Información de Contacto</h3>
        <p className="text-gray-700 font-bold">{name}</p>
        <p className="text-gray-600">{user?.email}</p>
        <div className="mt-4 flex gap-6">
          <Link href="/cuenta/editar" className="text-blue-600">Editar</Link>
          <Link href="/cuenta/password" className="text-blue-600">Cambiar contraseña</Link>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default function CuentaPage() {
  const router = useRouter();
  const { user, session } = useAuth();

  const [activeTab, setActiveTab] = useState('Mi Cuenta');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // FIX REAL — evita logout fantasma y bucles
  useEffect(() => {
    if (session === undefined) return;  

    setIsCheckingAuth(false);

    if (!session) router.replace("/cuenta/login");
  }, [session, router]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace('/cuenta/login');
  }, [router]);

  if (isCheckingAuth) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#A78D5A] rounded-full"></div>
      <p className="ml-3">Conectando...</p>
    </div>
  );

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 flex gap-10">
      <aside className="w-64 bg-white p-5 border rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">MENÚ CLIENTE</h2>

        {navItems.map(item => (
          <button key={item.name} onClick={() => setActiveTab(item.name)}
            className={`w-full text-left py-2 px-3 rounded-md mb-1 ${
              activeTab === item.name ? "bg-[#A78D5A] text-white font-bold"
              : "hover:bg-gray-100"
            }`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </aside>

      <section className="flex-1">
        <AccountInfo user={user} handleLogout={handleLogout}/>
      </section>
    </div>
  );
}
