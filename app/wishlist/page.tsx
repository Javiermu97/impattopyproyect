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
  const { user } = useAuth();
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) {
      router.replace('/cuenta/login?next=/wishlist');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlist.length > 0) {
        const { data } = await supabase.from('productos').select('*').in('id', wishlist);
        if (data) setProducts(data);
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [wishlist]);

  if (!user) return null;

  return (
    <div className="shop-container">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Mi lista de deseos</h1>

      {wishlist.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          Tu lista está vacía. <Link href="/hogar">Explorar productos</Link>
        </p>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <button className="btn-secondary" onClick={clearWishlist}>
              Vaciar lista
            </button>
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
