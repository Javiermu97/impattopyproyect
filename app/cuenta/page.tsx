'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
// Importamos el cliente de Supabase directamente para usar signOut
import { supabase } from '@/lib/supabaseClient'; 
// Importamos tipos necesarios de Supabase (ya que se usan en las props)
import { User } from '@supabase/supabase-js'; 

// --- Tipos para Props ---
type LogoutHandler = () => Promise<void>;

interface AccountInfoProps {
  user: User | null;
  handleLogout: LogoutHandler;
}

interface DynamicContentProps extends AccountInfoProps {
  activeTab: string;
}
// -----------------------

// --- Configuración de Navegación ---
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

// --- Sub-Componentes de Contenido (replicando el estilo Nissei) ---

// Contenido principal de la pestaña "Mi Cuenta"
const AccountInfo = ({ user, handleLogout }: AccountInfoProps) => {
  const userMetadata = user?.user_metadata || {};
  const name = userMetadata.full_name || 'Usuario Impatto';
  const email = user?.email || 'Sin correo registrado';
  const provider = user?.app_metadata.provider || 'email';
  
  return (
    <div className="space-y-8">
        {/* Bloque: Información de Contacto */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Información de Contacto</h3>
            <p className="text-gray-700 font-bold">{name}</p>
            <p className="text-gray-600">{email}</p>
            <div className="mt-4 flex space-x-6">
                <Link href="/cuenta/editar" className="text-blue-600 hover:text-blue-800 font-medium">Editar</Link>
                <Link href="/cuenta/password" className="text-blue-600 hover:text-blue-800 font-medium">Cambiar contraseña</Link>
            </div>
        </div>

        {/* Bloque: Boletines Informativos */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Boletines Informativos</h3>
            <p className="text-gray-600">Usted no está suscrito a nuestro boletín de noticias.</p>
            <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium">Editar suscripción</button>
        </div>

        {/* Bloque: Conexión Social (Google) - Botón Desconectar */}
        {provider === 'google' && (
            <div className="bg-yellow-50 p-6 border border-yellow-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Conexión con Google</h3>
                <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-red-600">G</span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        Desconectar Cuenta
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">* Al desconectar, deberá iniciar sesión con email y contraseña o volver a conectar con Google.</p>
            </div>
        )}
    </div>
  );
};

// Componente para manejar el contenido dinámico del menú
const DynamicContent = ({ activeTab, user, handleLogout }: DynamicContentProps) => {
    switch (activeTab) {
        case 'Mi Cuenta':
        case 'Información de la cuenta':
            return <AccountInfo user={user} handleLogout={handleLogout} />;
        case 'Libreta de direcciones':
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">Libreta de Direcciones</h2>
                    <p className="text-gray-600 mb-4">Aún no tienes direcciones registradas.</p>
                    {/* Replicando el estilo del botón primary de tu globals.css */}
                    <button className="btn-primary">
                        Añadir Nueva Dirección
                    </button>
                </div>
            );
        case 'Mis pedidos':
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">Mis Pedidos</h2>
                    <p className="text-gray-600">Aquí verás el historial de todos tus pedidos realizados.</p>
                </div>
            );
        // Contenido por defecto para todas las demás pestañas
        default:
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">{activeTab}</h2>
                    <p className="text-gray-600">El contenido para la sección "{activeTab}" está en desarrollo.</p>
                </div>
            );
    }
};


// --- Componente Principal de la Página /cuenta ---
export default function CuentaPage() {
  const router = useRouter();
  const { user, session } = useAuth();
  const [activeTab, setActiveTab] = useState('Mi Cuenta');

  // FIX: Se mueve el hook 'useCallback' a la parte superior de la función, 
  // antes de cualquier 'return' condicional, para cumplir con las reglas de Hooks.
  const handleLogout = useCallback(async () => {
    // Supabase está disponible porque la App está envuelta en AuthProvider
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error al cerrar sesión:', error.message);
        // NOTA: Usaríamos un modal en producción, pero Next.js acepta 'alert'
        alert('Error al cerrar sesión. Inténtalo de nuevo.'); 
    } else {
        router.replace('/cuenta/login');
    }
  }, [router]);

  // Redirección en caso de no estar autenticado o mientras carga
  if (session === undefined || user === undefined) {
      // Estado de carga o esperando la respuesta del listener
      return (
        <div className="flex justify-center items-center min-h-[60vh] bg-white">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#A78D5A]"></div>
            <p className="ml-3 text-gray-600">Cargando datos de sesión...</p>
        </div>
      );
  }

  if (!user) {
    // Si el AuthContext ya confirmó que no hay usuario, redirigir al login
    router.replace('/cuenta/login');
    return null;
  }
  
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Cliente';

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Título y Bienvenida (como Nissei) */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Mi Cuenta</h1>
        {/* FIX: Se cambia className='...' por className="..." en el <span> para evitar errores de linting */}
        <p className="mt-2 text-sm text-gray-600">Bienvenido, <span className="font-semibold text-[#A78D5A]">{name}</span>. Desde aquí puedes administrar tu información y pedidos.</p>
      </div>

      {/* Layout Principal: Sidebar y Contenido */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar de Navegación (Izquierda) */}
        <div className="w-full lg:w-64 bg-white p-4 lg:p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#A78D5A] border-b pb-2">MENÚ DE CLIENTE</h2>
          <nav>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center w-full py-2 px-3 rounded-md text-left transition-colors duration-150 ${
                  activeTab === item.name
                    ? 'bg-[#A78D5A] text-white font-bold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
          
          {/* Botón de Logout estilizado */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 px-3 bg-red-100 text-red-600 font-semibold rounded-md hover:bg-red-200 transition duration-150"
          >
              Cerrar Sesión
          </button>
        </div>

        {/* Área de Contenido Principal (Derecha) */}
        <div className="flex-1">
          <DynamicContent activeTab={activeTab} user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}