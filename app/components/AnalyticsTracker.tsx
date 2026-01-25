'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    supabase.from('page_views').insert([{ page_path: pathname }]).then();
  }, [pathname]);

  return null;
}