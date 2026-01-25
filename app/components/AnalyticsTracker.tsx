'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Buscamos un ID permanente en el dispositivo
    let deviceId = localStorage.getItem('impatto_device_id');
    
    // 2. Si no existe (primera vez), lo creamos
    if (!deviceId) {
      deviceId = 'dev_' + Math.random().toString(36).substring(2, 15) + Date.now();
      localStorage.setItem('impatto_device_id', deviceId);
    }

    const trackVisitor = async () => {
      // 3. Registramos la visita vinculada a ese ID de dispositivo
      await supabase.from('page_views').insert([{ 
        page_path: pathname, 
        session_id: deviceId // Usamos el ID de dispositivo aquí
      }]);
    };

    trackVisitor();
  }, [pathname]);

  return null;
}