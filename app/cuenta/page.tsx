'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Importamos supabase directamente para verificar la sesión manualmente
import { supabase } from '@/lib/supabaseClient'; 
import { User } from '@supabase/supabase-js'; 

// --- Configuración del Menú ---
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

export default function CuentaPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Mi Cuenta');
  
  // ESTADOS LOCALES PARA CONTROL TOTAL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DE PROTECCIÓN BLINDADA ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        // 1. Preguntamos directamente a Supabase (sin intermediarios)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
           // Si de verdad no hay sesión, entonces sí redirigimos
           console.log("No hay sesión, redirigiendo...");
           router.replace('/cuenta/login');
        } else {
           // Si hay sesión, guardamos el usuario y quitamos el loading
           console.log("Sesión encontrada:", session.user.email);
           setUser(session.user);
           setLoading(false);
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace('/cuenta/login');
  }, [router]);

  // --- MIENTRAS CARGA, MOSTRAMOS SPINNER (NO REDIRIGIMOS) ---
  if (loading) {
      return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A78D5A]"></div>
            <p className="mt-4 text-gray-500 font-medium">Verificando tu cuenta...</p>
        </div>
      );
  }

  // Si terminó de cargar y no hay usuario (caso raro, el useEffect ya debió redirigir), devolvemos null
  if (!user) return null;

  // --- RENDERIZADO DE LA PÁGINA (Solo si hay usuario) ---
  const userMeta = user.user_metadata || {};
  const displayName = userMeta.nombre || userMeta.full_name || user.email?.split('@')[0] || 'Cliente';
  const provider = user.app_metadata?.provider || 'email';

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
        <p className="mt-2 text-gray-600">
            Bienvenido, <span className="font-semibold text-[#A78D5A]">{displayName}</span>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden sticky top-4">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Menú de Cliente</h2>
                </div>
                <nav className="flex flex-col p-2 space-y-1">
                    {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                        activeTab === item.name
                            ? 'bg-[#A78D5A] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <span className="mr-3 text-lg w-6 text-center">{item.icon}</span>
                        {item.name}
                    </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                        <span className="mr-2">🚪</span> Cerrar Sesión
                    </button>
                </div>
            </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 min-w-0 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
             {/* Aquí puedes renderizar los componentes dinámicos según activeTab */}
             {activeTab === 'Mi Cuenta' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded bg-gray-50">
                            <h3 className="font-semibold text-gray-700">Datos de Contacto</h3>
                            <p className="text-gray-600 mt-2">{user.email}</p>
                            <p className="text-gray-600">{displayName}</p>
                        </div>
                        {provider === 'google' && (
                            <div className="p-4 border border-blue-100 rounded bg-blue-50">
                                <h3 className="font-semibold text-blue-800">Cuenta de Google</h3>
                                <p className="text-sm text-blue-600 mt-2">Estás conectado mediante Google.</p>
                            </div>
                        )}
                    </div>
                </div>
             )}
             
             {/* Mensaje por defecto para otras pestañas */}
             {activeTab !== 'Mi Cuenta' && (
                 <div className="text-center py-10">
                     <h3 className="text-xl text-gray-500">Sección: {activeTab}</h3>
                     <p className="text-gray-400">Contenido en desarrollo...</p>
                 </div>
             )}
        </main>
      </div>
    </div>
  );
}