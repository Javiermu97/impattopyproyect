"use client";

import { useState, useMemo, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { useAuth } from '@/app/context/AuthContext';

/* ================= ICONOS ================= */
const IconColumns2 = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em">
    <rect x="2" y="2" width="5" height="12" rx="1" />
    <rect x="9" y="2" width="5" height="12" rx="1" />
  </svg>
);
const IconColumns3 = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em">
    <rect x="1.5" y="2" width="3.66" height="12" rx="1" />
    <rect x="6.16" y="2" width="3.66" height="12" rx="1" />
    <rect x="10.82" y="2" width="3.66" height="12" rx="1" />
  </svg>
);
const IconColumns4 = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em">
    <rect x="1.5" y="2" width="2.5" height="12" rx="0.5" />
    <rect x="5" y="2" width="2.5" height="12" rx="0.5" />
    <rect x="8.5" y="2" width="2.5" height="12" rx="0.5" />
    <rect x="12" y="2" width="2.5" height="12" rx="0.5" />
  </svg>
);
const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);
const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

/* ================= COMPONENTE ================= */
export default function ShopPageClient({ products }: { products: Product[] }) {
  const MIN_PRICE = 0;
  const MAX_PRICE = 500000;
  const ROWS_PER_PAGE = 3;

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('caracteristicas');
  const [columns, setColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1200);

  /* ===== sincroniza ancho de pantalla ===== */
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  /* ===== columnas reales según viewport ===== */
  const effectiveColumns = windowWidth < 1024 ? 2 : columns;
  const productsPerPage = effectiveColumns * ROWS_PER_PAGE;

  /* ===== reset página si cambia algo ===== */
  useEffect(() => {
    setCurrentPage(1);
  }, [availability, priceRange, sortBy, products, effectiveColumns]);

  /* ===== filtros ===== */
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (availability.length === 1) {
      filtered = availability[0] === 'in-stock'
        ? filtered.filter(p => p.inStock)
        : filtered.filter(p => !p.inStock);
    }

    filtered = filtered.filter(
      p => p.price! >= priceRange[0] && p.price! <= priceRange[1]
    );

    switch (sortBy) {
      case 'precio-asc': filtered.sort((a, b) => a.price! - b.price!); break;
      case 'precio-desc': filtered.sort((a, b) => b.price! - a.price!); break;
      case 'nombre-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'nombre-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    return filtered;
  }, [products, availability, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  /* ===== wishlist ===== */
  const handleWishlistClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return router.push('/cuenta/login?redirected=true');
    toggleWishlist(id);
  };

  /* ================= RENDER ================= */
  return (
    <div className="shop-layout">
      <main className="product-grid-area">
        <div className="product-controls">
          <div className="view-toggles">
            <button onClick={() => setColumns(2)} className={columns === 2 ? 'active' : ''}><IconColumns2 /></button>
            <button onClick={() => setColumns(3)} className={columns === 3 ? 'active' : ''}><IconColumns3 /></button>
            <button onClick={() => setColumns(4)} className={columns === 4 ? 'active' : ''}><IconColumns4 /></button>
          </div>
        </div>

        <div className={`product-grid-shop columns-${effectiveColumns}`}>
          {currentProducts.map(p => {
            const id = Number(p.id);
            return (
              <Link key={id} href={`/products/${id}`} className="shop-product-card-link">
                <div className="shop-product-card">
                  <div className="image-container">
                    <Image src={p.imageUrl} alt={p.name} fill />
                  </div>
                  <div className="shop-title-row">
                    <h4>{p.name}</h4>
                    <button onClick={(e) => handleWishlistClick(e, id)}>
                      {isInWishlist(id) ? <IoHeart /> : <IoHeartOutline />}
                    </button>
                  </div>
                  <span>Gs. {p.price?.toLocaleString('es-PY')}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&lt;</button>
            <span>{currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>&gt;</button>
          </div>
        )}
      </main>
    </div>
  );
}
