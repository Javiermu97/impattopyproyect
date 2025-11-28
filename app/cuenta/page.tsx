'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient'; 
import { User } from '@supabase/supabase-js'; 

// --- Tipos ---
type LogoutHandler = () => Promise<void>;

interface AccountInfoProps {
  user: User | null;
  handleLogout: LogoutHandler;
}

interface DynamicContentProps extends AccountInfoProps {
  activeTab: string;
}

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

// --- Sub-Componentes ---

const AccountInfo = ({ user, handleLogout }: AccountInfoProps) => {
  const userMetadata = user?.user_metadata || {};
  const name = userMetadata.nombre ? `${userMetadata.nombre} ${userMetadata.apellido || ''}` : (userMetadata.full_name || 'Cliente Impatto');
  const email = user?.email || 'Sin correo registrado';
  const provider = user?.app_metadata?.provider || 'email';
  
  return (
    <div className="space-y-8 animate-fadeIn">
        {/* Tarjeta de Información */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Información de Contacto</h3>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-900 font-bold text-lg">{name}</p>
                    <p className="text-gray-600">{email}</p>
                </div>
                <div className="flex space-x-4">
                    <Link href="/cuenta/editar" className="text-[#A78D5A] hover:text-[#8a7346] font-medium transition-colors">
                        Editar
                    </Link>
                    <Link href="/cuenta/password" className="text-[#A78D5A] hover:text-[#8a7346] font-medium transition-colors">
                        Cambiar contraseña
                    </Link>
                </div>
            </div>
        </div>

        {/* Tarjeta de Boletín */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Boletines Informativos</h3>
            <p className="text-gray-600 mb-3">Usted no está suscrito a nuestro boletín de noticias.</p>
            <button className="text-[#A78D5A] hover:text-[#8a7346] font-medium transition-colors">Editar suscripción</button>
        </div>

        {/* Tarjeta de Google (Solo si aplica) */}
        {provider === 'google' && (
            <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Conexión Social</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                         {/* Icono simple de Google */}
                        <div className="bg-white p-2 rounded-full shadow-sm border">
                           <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Conectado con Google</span>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="text-red-600 hover:text-red-800 text-sm font-semibold border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                        Desconectar
                    </button>
                </div>
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
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 animate-fadeIn">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">Libreta de Direcciones</h2>
                    <p className="text-gray-600 mb-6">Gestiona tus direcciones de envío y facturación.</p>
                    <div className="bg-gray-50 p-8 text-center rounded border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No tienes direcciones registradas por defecto.</p>
                        <button className="px-6 py-2 bg-[#A78D5A] text-white font-semibold rounded hover:bg-[#8a7346] transition duration-150">
                            Añadir Nueva Dirección
                        </button>
                    </div>
                </div>
            );
        case 'Mis pedidos':
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 animate-fadeIn">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-900">Historial de Pedidos</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                          <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
                            <tr>
                              <th scope="col" className="px-6 py-3">Pedido #</th>
                              <th scope="col" className="px-6 py-3">Fecha</th>
                              <th scope="col" className="px-6 py-3">Estado</th>
                              <th scope="col" className="px-6 py-3">Total</th>
                              <th scope="col" className="px-6 py-3">Acción</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600">
                             <tr>
                                <td colSpan={5} className="px-6 py-8 text-center italic">No se encontraron pedidos recientes.</td>
                             </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            );
        default:
            return (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 animate-fadeIn">
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
  const [isChecking, setIsChecking] = useState(true);

  // LOGICA DE PROTECCIÓN (Corregida y segura)
  useEffect(() => {
    // Si session sigue siendo undefined, esperamos.
    if (session === undefined) return;

    setIsChecking(false);

    // Si ya cargó y NO hay usuario, redirigir suavemente.
    if (!user) {
        router.replace('/cuenta/login');
    }
  }, [session, user, router]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace('/cuenta/login');
  }, [router]);

  // Spinner de carga mientras verifica sesión
  if (isChecking || (session !== undefined && !user)) {
      return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A78D5A]"></div>
            <p className="mt-4 text-gray-500 font-medium">Cargando tu cuenta...</p>
        </div>
      );
  }

  // Nombre para mostrar
  const userMeta = user?.user_metadata || {};
  const displayName = userMeta.nombre || userMeta.full_name || user?.email?.split('@')[0] || 'Cliente';

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
        
        {/* SIDEBAR (Columna Izquierda) */}
        <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden sticky top-4">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Menú de Cliente</h2>
                </div>
                {/* Aseguramos flex-col para que sea vertical */}
                <nav className="flex flex-col p-2 space-y-1">
                    {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                        activeTab === item.name
                            ? 'bg-[#A78D5A] text-white shadow-md transform scale-[1.02]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <span className="mr-3 text-lg w-6 text-center">{item.icon}</span>
                        {item.name}
                    </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    >
                        <span className="mr-2">🚪</span> Cerrar Sesión
                    </button>
                </div>
            </div>
        </aside>

        {/* CONTENIDO PRINCIPAL (Columna Derecha) */}
        <main className="flex-1 min-w-0">
          <DynamicContent activeTab={activeTab} user={user} handleLogout={handleLogout} />
        </main>
      </div>
    </div>
  );
}