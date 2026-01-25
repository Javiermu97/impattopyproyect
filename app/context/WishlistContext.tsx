'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabaseClient';

type WishlistCtx = {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      const fetchWishlist = async () => {
        const { data } = await supabase
          .from('wishlist')
          .select('product_id')
          .eq('user_id', user.id);
        if (data) setWishlist(data.map(item => item.product_id));
      };
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

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
    if (!user) return;
    setWishlist([]);
    await supabase.from('wishlist').delete().eq('user_id', user.id);
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
