'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient'; 
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

// Contenido principal de la pestaña "Mi Cuenta"
const AccountInfo = ({ user, handleLogout }: AccountInfoProps) => {
  const meta = user?.user_metadata;
  const name = meta?.full_name || user?.email?.split('@')[0] || "Usuario";
  const email = user?.email || 'Sin correo registrado';
  const provider = user?.app_metadata.provider || 'email';
  
  return (
    <div className="space-y-8 p-4 sm:p-0">
        {/* Encabezado: Mi Cuenta (visible en el ejemplo Nissei) */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">Mi Cuenta</h1>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Columna Izquierda */}
            <div className="flex-1 space-y-8">
                {/* Bloque: Información de Contacto */}
                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Información de Contacto</h3>
                    <p className="text-gray-700 font-bold">{name}</p>
                    <p className="text-gray-600">{email}</p>
                    <div className="mt-4 flex gap-6">
                        <Link href="/cuenta/editar" className="text-blue-600 hover:text-blue-800 font-medium">Editar</Link>
                        <Link href="/cuenta/password" className="text-blue-600 hover:text-blue-800 font-medium">Cambiar contraseña</Link>
                    </div>
                </div>

                {/* Bloque: Conexión Social (Google) - Réplica exacta del Nissei */}
                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Conexión con Google</h3>
                    <div className="flex items-center space-x-3">
                        {provider === 'google' ? (
                            <>
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">G</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                                >
                                    Desconectar Cuenta
                                </button>
                            </>
                        ) : (
                            <p className='text-gray-500'>Conéctate con tu red social.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Columna Derecha */}
            <div className="flex-1 space-y-8">
                {/* Bloque: Boletines Informativos */}
                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Boletines Informativos</h3>
                    <p className="text-gray-600">Usted no está suscrito a nuestro boletín de noticias.</p>
                    <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium">Editar</button>
                </div>

                {/* Bloque: Información de la Venta (Simulación Nissei) */}
                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Información de la Venta</h3>
                    <p className="text-gray-600">Aquí se mostrará información relevante sobre tus compras y créditos.</p>
                </div>
            </div>
        </div>

        <div className="pt-8 border-t mt-8">
            <Link href="/cuenta/direcciones" className="text-blue-600 hover:text-blue-800 font-medium">
                {/* ✅ CORREGIDO: Separamos el > del texto para evitar el error de linting */}
                Gestionar direcciones <span aria-hidden="true">&gt;</span> 
            </Link>
        </div>
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
  // 1. Siempre llama a los hooks primero
  const { user, loading } = useAuth(); 
  const [activeTab, setActiveTab] = useState('Mi Cuenta');

  // 2. Define la función de callback incondicionalmente
  const handleLogout = useCallback(async () => {
    // Supabase está disponible porque la App está envuelta en AuthProvider
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error al cerrar sesión:', error.message);
        // Usar un modal o toast en un entorno real
        alert('Error al cerrar sesión. Inténtalo de nuevo.'); 
    } else {
        router.replace('/cuenta/login');
    }
  }, [router]);

  // 3. Manejo del estado de la sesión (lógica estable)
  if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[70vh] bg-white">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#A78D5A]"></div>
            <p className="ml-3 text-gray-600">Cargando sesión...</p>
        </div>
      );
  }

  if (!user && !loading) {
    // Si la carga terminó y no hay usuario, redirigir al login
    router.replace('/cuenta/login');
    return null;
  }
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Título de la sección (Réplica del header de Nissei) */}
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6 hidden lg:block">Mi Cuenta</h1>

      {/* Layout Principal: Sidebar y Contenido */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar de Navegación (Izquierda) */}
        <div className="w-full lg:w-64 bg-gray-50 p-4 lg:p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#A78D5A] border-b pb-2">Mi Cuenta</h2>
          <nav>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center w-full py-2 px-3 rounded-md text-left transition-colors duration-150 text-base ${
                  activeTab === item.name
                    ? 'bg-[#A78D5A] text-white font-bold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-200'
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
            className="w-full mt-6 py-2 px-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-150"
          >
              Cerrar Sesión
          </button>
        </div>

        {/* Área de Contenido Principal (Derecha) */}
        <div className="flex-1 bg-white">
          <DynamicContent activeTab={activeTab} user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}