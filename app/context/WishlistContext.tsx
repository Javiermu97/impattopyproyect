'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabaseClient'; // Única línea nueva

type WishlistCtx = {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistCtx | null>(null);
const STORAGE_KEY = 'impatto_wishlist_v1';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<number[]>([]);

  // 1. Cargar de LocalStorage (tu código original)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch {}
  }, []);

  // 2. Sincronizar con Supabase si hay usuario
  useEffect(() => {
    if (user) {
      const fetchDB = async () => {
        const { data } = await supabase.from('wishlist').select('product_id').eq('user_id', user.id);
        if (data) setWishlist(data.map(item => item.product_id));
      };
      fetchDB();
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const toggleWishlist = useCallback(
    async (productId: number) => {
      if (!user) {
        router.push('/cuenta/login?redirected=true');
        return;
      }

      const isAdded = wishlist.includes(productId);
      if (isAdded) {
        setWishlist(prev => prev.filter(id => id !== productId));
        await supabase.from('wishlist').delete().match({ user_id: user.id, product_id: productId });
      } else {
        setWishlist(prev => [productId, ...prev]);
        await supabase.from('wishlist').insert([{ user_id: user.id, product_id: productId }]);
      }
    },
    [user, router, wishlist]
  );

  const clearWishlist = useCallback(async () => {
    if (user) {
      await supabase.from('wishlist').delete().eq('user_id', user.id);
    }
    setWishlist([]);
  }, [user]);

  const value: WishlistCtx = useMemo(() => {
    const isInWishlist = (productId: number) => wishlist.includes(productId);
    return { wishlist, toggleWishlist, isInWishlist, clearWishlist };
  }, [wishlist, toggleWishlist, clearWishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist debe usarse dentro de WishlistProvider');
  return ctx;
}