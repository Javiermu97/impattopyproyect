'use client';

import React, { useState, useCallback, useEffect } from 'react';
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

// --- Sub-Componentes ---

const AccountInfo = ({ user, handleLogout }: AccountInfoProps) => {
  const userMetadata = user?.user_metadata || {};
  const name = userMetadata.full_name || 'Usuario Impatto';
  const email = user?.email || 'Sin correo registrado';
  const provider = user?.app_metadata?.provider || 'email';
  
  return (
    <div className="space-y-8">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Información de Contacto</h3>
            <p className="text-gray-700 font-bold">{name}</p>
            <p className="text-gray-600">{email}</p>
            <div className="mt-4 flex space-x-6">
                <Link href="/cuenta/editar" className="text-blue-600 hover:text-blue-800 font-medium">Editar</Link>
                <Link href="/cuenta/password" className="text-blue-600 hover:text-blue-800 font-medium">Cambiar contraseña</Link>
            </div>
        </div>
        
        {/* Bloque Google */}
        {provider === 'google' && (
            <div className="bg-yellow-50 p-6 border border-yellow-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Conexión con Google</h3>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md">
                    Desconectar Cuenta
                </button>
            </div>
        )}
    </div>
  );
};

const DynamicContent = ({ activeTab, user, handleLogout }: DynamicContentProps) => {
    switch (activeTab) {
        case 'Mi Cuenta':
        case 'Información de la cuenta':
            return <AccountInfo user={user} handleLogout={handleLogout} />;
        case 'Libreta de direcciones':
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">Libreta de Direcciones</h2>
                    <button className="btn-primary mt-4 px-4 py-2 bg-blue-600 text-white rounded">Añadir Nueva Dirección</button>
                </div>
            );
        case 'Mis pedidos':
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">Mis Pedidos</h2>
                    <p className="text-gray-600">Historial de pedidos...</p>
                </div>
            );
        default:
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">{activeTab}</h2>
                    <p className="text-gray-600">El contenido para la sección &quot;{activeTab}&quot; está en desarrollo.</p>
                </div>
            );
    }
};

// --- Componente Principal ---
export default function CuentaPage() {
  const router = useRouter();
  const { user, session } = useAuth(); 
  const [activeTab, setActiveTab] = useState('Mi Cuenta');

  // NO REDIRECCIONAMOS AUTOMÁTICAMENTE para depurar
  // Solo mostramos logs en consola
  useEffect(() => {
    console.log("--- ESTADO DE AUTH EN CUENTA/PAGE ---");
    console.log("Session:", session);
    console.log("User:", user);
    
    // Si quisieras activar la protección de nuevo, descomenta esto:
    /*
    if (session !== undefined && !user) {
       router.replace('/cuenta/login');
    }
    */
  }, [user, session]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace('/cuenta/login');
  }, [router]);

  // RENDERIZADO DE DIAGNÓSTICO
  // Si no hay usuario, mostramos una advertencia en lugar de redirigir
  if (session !== undefined && !user) {
      return (
          <div className="max-w-4xl mx-auto mt-10 p-10 bg-red-50 border border-red-200 rounded text-center">
              <h1 className="text-2xl font-bold text-red-700 mb-4">⚠️ No se detectó sesión activa</h1>
              <p className="mb-4">El sistema cree que no estás logueado. Esto puede deberse a:</p>
              <ul className="list-disc text-left inline-block mb-6 text-gray-700">
                  <li>El inicio de sesión falló silenciosamente.</li>
                  <li>Las cookies de Supabase no se guardaron.</li>
                  <li>El código de redirección anterior era demasiado rápido.</li>
              </ul>
              <div className="flex justify-center gap-4">
                  <Link href="/cuenta/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Ir a Iniciar Sesión manualmente
                  </Link>
                  <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                      Recargar Página
                  </button>
              </div>
          </div>
      );
  }

  // Si está cargando...
  if (session === undefined) {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-gray-500">Cargando información de usuario...</p>
        </div>
      );
  }

  // Si HAY usuario, mostramos el contenido normal
  const name = user?.user_metadata?.full_name || user?.email || 'Cliente';

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* BARRA DE DEBUG (Bórrala cuando todo funcione) */}
      <div className="bg-green-100 text-green-800 p-2 text-xs mb-4 rounded border border-green-200">
          <strong>DEBUG:</strong> Usuario detectado: {user?.email} (ID: {user?.id})
      </div>

      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Mi Cuenta</h1>
        <p className="mt-2 text-sm text-gray-600">Bienvenido, <span className="font-semibold text-[#A78D5A]">{name}</span>.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
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
          <button onClick={handleLogout} className="w-full mt-6 py-2 px-3 bg-red-100 text-red-600 font-semibold rounded-md hover:bg-red-200 transition duration-150">
              Cerrar Sesión
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <DynamicContent activeTab={activeTab} user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}