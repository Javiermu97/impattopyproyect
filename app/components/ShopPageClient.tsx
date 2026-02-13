"use client";
import { useState, useMemo, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { IoHeartOutline, IoHeart, IoCloseOutline, IoOptionsOutline } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { useAuth } from '@/app/context/AuthContext';

// --- ICONOS COMPONENTES ---
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
const IconChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
  </svg>
);

interface ShopPageClientProps {
  products: Product[];
}

export default function ShopPageClient({ products }: ShopPageClientProps) {
  // Constantes de configuración
  const MIN_PRICE = 0;
  const MAX_PRICE = 500000;
  const PRODUCTS_PER_PAGE = 12;

  // Contextos y Router
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  // Estados de Filtros y UI
  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('caracteristicas');
  const [columns, setColumns] = useState(3);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilters, setOpenFilters] = useState({ availability: true, price: true });

  // Estado para inputs de precio (manejo de formato Gs.)
  const [priceInputs, setPriceInputs] = useState({
    min: priceRange[0].toLocaleString('es-PY'),
    max: priceRange[1].toLocaleString('es-PY'),
  });

  // Bloquear scroll cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? 'hidden' : 'unset';
  }, [isFilterOpen]);

  // Ajustar columnas iniciales en móvil
  useEffect(() => {
    if (window.innerWidth <= 992) {
      setColumns(2);
    }
  }, []);

  // Actualizar inputs cuando el slider cambia
  useEffect(() => {
    setPriceInputs({
      min: priceRange[0].toLocaleString('es-PY'),
      max: priceRange[1].toLocaleString('es-PY'),
    });
  }, [priceRange]);

  // Resetear página al filtrar o cambiar orden
  useEffect(() => {
    setCurrentPage(1);
  }, [availability, priceRange, sortBy]);

  const toggleFilterSection = (name: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAvailabilityChange = (value: string) => {
    setAvailability(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = e.target.value.replace(/\D/g, '');
    setPriceInputs(prev => ({ 
      ...prev, 
      [type]: value ? parseInt(value, 10).toLocaleString('es-PY') : '' 
    }));
  };

  const handlePriceInputBlur = () => {
    const min = parseInt(priceInputs.min.replace(/\./g, ''), 10) || MIN_PRICE;
    const max = parseInt(priceInputs.max.replace(/\./g, ''), 10) || MAX_PRICE;
    setPriceRange(min > max ? [max, min] : [min, max]);
  };

  // Lógica de conteo de disponibilidad
  const availabilityCounts = useMemo(() => {
    return {
      inStock: products.filter(p => p.inStock === true).length,
      outOfStock: products.filter(p => p.inStock !== true).length,
    };
  }, [products]);

  // Lógica principal de Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtro Disponibilidad
    if (availability.length > 0) {
      const inStockSelected = availability.includes('in-stock');
      const outOfStockSelected = availability.includes('out-of-stock');
      if (inStockSelected && !outOfStockSelected) {
        filtered = filtered.filter(p => p.inStock === true);
      } else if (!inStockSelected && outOfStockSelected) {
        filtered = filtered.filter(p => p.inStock !== true);
      }
    }

    // Filtro Precio
    filtered = filtered.filter(
      p => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
    );

    // Ordenamiento
    switch (sortBy) {
      case 'precio-asc': filtered.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'precio-desc': filtered.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'nombre-asc': filtered.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
      case 'nombre-desc': filtered.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break;
      case 'fecha-desc': 
        filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()); 
        break;
    }
    return filtered;
  }, [products, availability, priceRange, sortBy]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE, 
    currentPage * PRODUCTS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
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
      {/* Overlay para cerrar drawer */}
      <div 
        className={`filter-overlay ${isFilterOpen ? 'active' : ''}`} 
        onClick={() => setIsFilterOpen(false)} 
      />

      {/* Sidebar / Drawer */}
      <aside className={`filters-sidebar ${isFilterOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-header">
          <div className="header-title-container">
            <h3>FILTROS</h3>
            <span className="products-count">{filteredProducts.length} productos</span>
          </div>
          <button className="close-drawer" onClick={() => setIsFilterOpen(false)}>
            <IoCloseOutline size={32} />
          </button>
        </div>

        <div className="drawer-content">
          {/* Ordenar (Solo visible en Mobile dentro del drawer) */}
          <div className="filter-group mobile-only-filter">
            <h3 className="filter-title-main">ORDENAR POR</h3>
            <select 
              className="mobile-sort-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="caracteristicas">Características</option>
              <option value="nombre-asc">Alfabéticamente, A-Z</option>
              <option value="nombre-desc">Alfabéticamente, Z-A</option>
              <option value="precio-asc">Precio, menor a mayor</option>
              <option value="precio-desc">Precio, mayor a menor</option>
              <option value="fecha-desc">Más recientes</option>
            </select>
          </div>

          {/* Sección Disponibilidad */}
          <div className="filter-group">
            <button className="filter-title" onClick={() => toggleFilterSection('availability')}>
              <span>DISPONIBILIDAD</span>
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

          {/* Sección Precio */}
          <div className="filter-group">
            <button className="filter-title" onClick={() => toggleFilterSection('price')}>
              <span>PRECIO</span>
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
        </div>

        <div className="drawer-footer">
          <button className="btn-apply" onClick={() => setIsFilterOpen(false)}>
            VER RESULTADOS
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="product-grid-area">
        <div className="product-controls">
          <button className="mobile-filter-trigger" onClick={() => setIsFilterOpen(true)}>
            <IoOptionsOutline size={20} />
            <span>Filtros</span>
          </button>

          <div className="view-toggles">
            <button onClick={() => setColumns(2)} className={columns === 2 ? 'active' : ''}><IconColumns2 /></button>
            <button onClick={() => setColumns(3)} className={columns === 3 ? 'active' : ''}><IconColumns3 /></button>
            <button onClick={() => setColumns(4)} className={columns === 4 ? 'active' : ''}><IconColumns4 /></button>
          </div>

          <div className="sort-by desktop-only-filter">
            <label htmlFor="sort">Ordenar:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="caracteristicas">Características</option>
              <option value="nombre-asc">A-Z</option>
              <option value="nombre-desc">Z-A</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
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
                    <div className="image-container">
                      {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 768px) 50vw, 33vw" 
                        className="shop-product-image-primary" 
                      />
                      {product.imageUrl2 && (
                        <Image 
                          src={product.imageUrl2} 
                          alt={product.name} 
                          fill 
                          sizes="(max-width: 768px) 50vw, 33vw" 
                          className="shop-product-image-secondary" 
                        />
                      )}
                    </div>
                    <div className="shop-title-row">
                      <h4>{product.name}</h4>
                      <button 
                        onClick={(e) => handleWishlistClick(e, pid)} 
                        className={`wishlist-inline-btn ${isInWishlist(pid) ? 'active' : ''}`}
                      >
                        {isInWishlist(pid) ? <IoHeart size={20}/> : <IoHeartOutline size={20}/>}
                      </button>
                    </div>
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
            <p className="no-products-message">No se encontraron productos.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>&lt;</button>
            {getPageNumbers().map(number => (
              <button 
                key={number} 
                onClick={() => setCurrentPage(number)} 
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}>&gt;</button>
          </div>
        )}
      </main>
    </div>
  );
}