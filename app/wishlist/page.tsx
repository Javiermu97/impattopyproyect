'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useWishlist } from '@/app/context/WishlistContext';

export default function WishlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();

  // Si no hay sesión, redirige al login (como pediste)
  useEffect(() => {
    if (!user) {
      router.replace('/cuenta/login?next=/wishlist');
    }
  }, [user, router]);

  if (!user) return null; // evita parpadeo mientras redirige

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
            {wishlist.map((id: number) => (
              <div key={id} className="shop-product-card" style={{ padding: '1rem' }}>
                <h4>Producto #{id}</h4>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                  <Link href={`/products/${id}`} className="btn-primary">
                    Ver producto
                  </Link>
                  <button
                    className="btn-secondary"
                    onClick={() => toggleWishlist(id)} // quitar = toggle otra vez
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
