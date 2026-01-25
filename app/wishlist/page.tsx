'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import ProductCard from '@/app/components/ProductCard';

export default function WishlistPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { wishlist, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/cuenta/login?next=/wishlist');
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        return;
      }
      setLoadingProducts(true);
      const { data } = await supabase.from('productos').select('*').in('id', wishlist);
      if (data) setProducts(data);
      setLoadingProducts(false);
    };
    fetchWishlistProducts();
  }, [wishlist]);

  if (authLoading || (!user && !authLoading)) {
    return <div className="w-full flex justify-center py-20"><div className="animate-spin h-10 w-10 border-4 border-[#A78D5A] border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="shop-container" style={{ padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', fontWeight: '800', marginBottom: '10px' }}>Mi lista de deseos</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Productos que te encantaron</p>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>No tienes productos guardados.</p>
          <Link href="/hogar" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>Explorar Tienda</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button className="btn-secondary" onClick={clearWishlist}>VACIAR TODO</button>
          </div>
          <div className="product-grid-shop columns-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
