'use client';

import { useState, useMemo, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { useAuth } from '@/app/context/AuthContext';

const IconColumns2 = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}>
    <rect x="2" y="2" width="5" height="12" rx="1"></rect>
    <rect x="9" y="2" width="5" height="12" rx="1"></rect>
  </svg>
);
const IconColumns3 = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}>
    <rect x="1.5" y="2" width="3.66" height="12" rx="1"></rect>
    <rect x="6.16" y="2" width="3.66" height="12" rx="1"></rect>
    <rect x="10.82" y="2" width="3.66" height="12" rx="1"></rect>
  </svg>
);
const IconColumns4 = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}>
    <rect x="1.5" y="2" width="2.5" height="12" rx="0.5"></rect>
    <rect x="5" y="2" width="2.5" height="12" rx="0.5"></rect>
    <rect x="8.5" y="2" width="2.5" height="12" rx="0.5"></rect>
    <rect x="12" y="2" width="2.5" height="12" rx="0.5"></rect>
  </svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0  1 .708 .708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);
const IconChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

export default function ShopPageClient({ products }: { products: Product[] }) {
  const MIN_PRICE = 0;
  const MAX_PRICE = 500000;
  const PRODUCTS_PER_PAGE = 8;

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('caracteristicas');
  const [columns, setColumns] = useState(3);
  const [priceInputs, setPriceInputs] = useState({
    min: priceRange[0].toLocaleString('es-PY'),
    max: priceRange[1].toLocaleString('es-PY'),
  });
  const [openFilters, setOpenFilters] = useState({ availability: true, price: true });
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilterSection = (name: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const availabilityCounts = useMemo(() => {
    if (!products) return { inStock: 0, outOfStock: 0 };
    return {
      inStock: products.filter(p => p.inStock === true).length,
      outOfStock: products.filter(p => p.inStock !== true).length,
    };
  }, [products]);

  useEffect(() => {
    setPriceInputs({
      min: priceRange[0].toLocaleString('es-PY'),
      max: priceRange[1].toLocaleString('es-PY'),
    });
  }, [priceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [availability, priceRange, sortBy, products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = [...products];

    if (availability.length > 0) {
      const inStockSelected = availability.includes('in-stock');
      const outOfStockSelected = availability.includes('out-of-stock');
      if (inStockSelected && !outOfStockSelected) {
        filtered = filtered.filter(p => p.inStock === true);
      } else if (!inStockSelected && outOfStockSelected) {
        filtered = filtered.filter(p => p.inStock !== true);
      }
    }

    filtered = filtered.filter(
      p => typeof p.price === 'number' && p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'precio-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'precio-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'nombre-asc':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'nombre-desc':
        filtered.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      case 'fecha-desc':
        filtered.sort(
          (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
        break;
      case 'fecha-asc':
        filtered.sort(
          (a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
        );
        break;
    }
    return filtered;
  }, [products, availability, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleAvailabilityChange = (value: string) => {
    setAvailability(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = e.target.value.replace(/\D/g, '');
    setPriceInputs(prev => ({
      ...prev,
      [type]: value ? parseInt(value, 10).toLocaleString('es-PY') : '',
    }));
  };

  const handlePriceInputBlur = () => {
    const min = parseInt(priceInputs.min.replace(/\./g, ''), 10) || MIN_PRICE;
    const max = parseInt(priceInputs.max.replace(/\./g, ''), 10) || MAX_PRICE;
    setPriceRange(min > max ? [max, min] : [min, max]);
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pageNumbers;
  };

  const handleWishlistClick = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push('/cuenta/login?redirected=true');
      return;
    }
    toggleWishlist(productId);
  };

  return (
    <div className="shop-layout">
      <aside className="filters-sidebar">
        <div className="filter-group">
          <h3 className="filter-title-main">TODO</h3>
          <div className="active-filters-container">
            {availability.map((filterValue) => (
              <div key={filterValue} className="active-filter-badge">
                <span>{filterValue === 'in-stock' ? 'En existencia' : 'Agotado'}</span>
                <button onClick={() => handleAvailabilityChange(filterValue)} className="remove-filter-btn">
                  <IconX />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <button className="filter-title" onClick={() => toggleFilterSection('availability')}>
            <span>Availability</span>
            <span className={`filter-chevron ${openFilters.availability ? 'open' : ''}`}>
              <IconChevron />
            </span>
          </button>
          <div className={`filter-content ${openFilters.availability ? 'open' : ''}`}>
            <div className="filter-option">
              <input
                type="checkbox"
                id="in-stock"
                checked={availability.includes('in-stock')}
                onChange={() => handleAvailabilityChange('in-stock')}
              />
              <label htmlFor="in-stock">En existencia ({availabilityCounts.inStock})</label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                id="out-of-stock"
                checked={availability.includes('out-of-stock')}
                onChange={() => handleAvailabilityChange('out-of-stock')}
              />
              <label htmlFor="out-of-stock">Agotado ({availabilityCounts.outOfStock})</label>
            </div>
          </div>
        </div>

        <div className="filter-group">
          <button className="filter-title" onClick={() => toggleFilterSection('price')}>
            <span>Price</span>
            <span className={`filter-chevron ${openFilters.price ? 'open' : ''}`}>
              <IconChevron />
            </span>
          </button>
          <div className={`filter-content ${openFilters.price ? 'open' : ''}`}>
            <Slider.Root
              className="SliderRoot"
              value={priceRange}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10000}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            >
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" />
              <Slider.Thumb className="SliderThumb" />
            </Slider.Root>
            <div className="price-input-container">
              <div className="price-input-wrapper">
                <span>Gs.</span>
                <input
                  type="text"
                  className="price-input"
                  value={priceInputs.min}
                  onChange={(e) => handlePriceInputChange(e, 'min')}
                  onBlur={handlePriceInputBlur}
                />
              </div>
              <div className="price-input-wrapper">
                <span>Gs.</span>
                <input
                  type="text"
                  className="price-input"
                  value={priceInputs.max}
                  onChange={(e) => handlePriceInputChange(e, 'max')}
                  onBlur={handlePriceInputBlur}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="product-grid-area">
        <div className="product-controls">
          <div className="view-toggles">
            <button onClick={() => setColumns(2)} className={columns === 2 ? 'active' : ''}><IconColumns2 /></button>
            <button onClick={() => setColumns(3)} className={columns === 3 ? 'active' : ''}><IconColumns3 /></button>
            <button onClick={() => setColumns(4)} className={columns === 4 ? 'active' : ''}><IconColumns4 /></button>
          </div>
          <div className="sort-by">
            <label htmlFor="sort">Ordenar:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="caracteristicas">Características</option>
              <option value="mas-vendidos">Más vendidos</option>
              <option value="nombre-asc">Alfabéticamente, A-Z</option>
              <option value="nombre-desc">Alfabéticamente, Z-A</option>
              <option value="precio-asc">Precio, menor a mayor</option>
              <option value="precio-desc">Precio, mayor a menor</option>
              <option value="fecha-desc">Fecha: reciente a antiguo(a)</option>
              <option value="fecha-asc">Fecha: antiguo(a) a reciente</option>
            </select>
          </div>
        </div>

        <div className={`product-grid-shop columns-${columns}`}>
          {currentProducts.length > 0 ? (
            currentProducts.map(product => {
              const pid = typeof product.id === 'string' ? Number(product.id) : product.id;

              return (
                <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
                  <div className="shop-product-card">
                    <div className="image-container" style={{ position: 'relative' }}>
                      {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}

                      {/* Contenedor de imágenes */}
                      <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '100%', 
                        zIndex: 1 
                      }}>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="shop-product-image-primary"
                          style={{ position: 'relative', zIndex: 1 }}
                        />
                        {product.imageUrl2 && (
                          <Image
                            src={product.imageUrl2}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="shop-product-image-secondary"
                            style={{ position: 'relative', zIndex: 1 }}
                          />
                        )}
                      </div>

                      {/* Corazón con estilos inline para garantizar visibilidad */}
                      <button
                        onClick={(e) => handleWishlistClick(e, pid)}
                        className={`wishlist-icon-btn ${isInWishlist(pid) ? 'active' : ''}`}
                        aria-label={isInWishlist(pid) ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
                        title="Lista de deseos"
                        style={{
                          position: 'absolute',
                          right: '10px',
                          bottom: '10px',
                          zIndex: 9999,
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          border: 'none',
                          background: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,.12)',
                          cursor: 'pointer'
                        }}
                      >
                        {isInWishlist(pid) ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                      </button>
                    </div>

                    <h4>{product.name}</h4>
                    <div className="price-section">
                      <span className="shop-product-price">
                        Gs. {(product.price || 0).toLocaleString('es-PY')}
                      </span>
                      {product.oldPrice && (
                        <span className="shop-product-old-price">
                          Gs. {product.oldPrice.toLocaleString('es-PY')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="no-products-message">No se encontraron productos con estos filtros.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
              &lt;
            </button>
            {getPageNumbers().map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

