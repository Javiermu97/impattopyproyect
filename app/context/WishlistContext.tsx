'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

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

  // Hidratar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch {}
  }, []);

  // Persistir
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const toggleWishlist = (productId: number) => {
    // Requiere login
    if (!user) {
      router.push('/cuenta/login?redirected=true');
      return;
    }
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [productId, ...prev]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);
  const clearWishlist = () => setWishlist([]);

  const value: WishlistCtx = useMemo(
    () => ({ wishlist, toggleWishlist, isInWishlist, clearWishlist }),
    [wishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist debe usarse dentro de WishlistProvider');
  return ctx;
}