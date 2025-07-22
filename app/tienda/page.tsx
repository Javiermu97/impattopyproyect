'use client';

import { useState, useMemo, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';

// --- ÍCONOS ---
const IconColumns2 = () => ( <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}><rect x="2" y="2" width="5" height="12" rx="1"></rect><rect x="9" y="2" width="5" height="12" rx="1"></rect></svg> );
const IconColumns3 = () => ( <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}><rect x="1.5" y="2" width="3.66" height="12" rx="1"></rect><rect x="6.16" y="2" width="3.66" height="12" rx="1"></rect><rect x="10.82" y="2" width="3.66" height="12" rx="1"></rect></svg> );
const IconColumns4 = () => ( <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}><rect x="1.5" y="2" width="2.5" height="12" rx="0.5"></rect><rect x="5" y="2" width="2.5" height="12" rx="0.5"></rect><rect x="8.5" y="2" width="2.5" height="12" rx="0.5"></rect><rect x="12" y="2" width="2.5" height="12" rx="0.5"></rect></svg> );
const IconX = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708 .708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg> );
const IconChevron = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg> );

// --- ESTRUCTURA DE DATOS Y BASE DE DATOS SIMULADA ---
type ProductVariant = {
  color: string;
  colorHex: string;
  image: string;
};

type Product = { 
  id: number; 
  name: string; 
  price: number; 
  oldPrice?: number; 
  inStock: boolean; 
  dateAdded: Date;
  imageUrl: string; 
  imageUrl2: string;
  galleryImages: string[];
  variants: ProductVariant[];
  description: string;
};

const allProducts: Product[] = [
  { 
    id: 1, 
    name: 'REMOVE LINT™ - Quita Pelusas', 
    price: 129000, 
    oldPrice: 199000, 
    inStock: true, 
    dateAdded: new Date('2025-07-21'),
    imageUrl: '/product1.png', 
    imageUrl2: '/product2.png',
    galleryImages: ['/pdp/lint-remover-main.png', '/pdp/lint-remover-2.png', '/pdp/lint-remover-3.png', '/pdp/lint-remover-4.png'],
    variants: [
      { color: 'Rosa', colorHex: '#FFC0CB', image: '/pdp/lint-remover-main.png' },
      { color: 'Celeste', colorHex: '#ADD8E6', image: '/pdp/lint-remover-blue.png' },
    ],
    description: "Un saca pelusas con un sólo gesto remueve las pelusas más rebeldes. Sus cuchillas son depositadas en un contenedor para que no se esparzan."
  },
  { 
    id: 2, 
    name: 'Cinta Mágica Doble Transparente', 
    price: 109000, 
    oldPrice: 159000, 
    inStock: true, 
    dateAdded: new Date('2025-07-20'),
    imageUrl: '/product3.png', 
    imageUrl2: '/product4.png',
    galleryImages: ['/pdp/tape-1.png', '/pdp/tape-2.png', '/pdp/tape-3.png'],
    variants: [
      { color: 'Transparente', colorHex: '#FFFFFF', image: '/pdp/tape-1.png' },
    ],
    description: "Cinta de doble cara, lavable y reutilizable. Fuerte adherencia y alta resistencia."
  },
  // ===== CAMBIO AQUÍ: Añadido 'oldPrice' al Mini Masajeador =====
  { id: 3, name: 'Mini Masajeador', price: 99000, oldPrice: 159000, inStock: false, dateAdded: new Date('2025-06-25'), imageUrl: '/product3.png', imageUrl2: '/product4.png', galleryImages: ['/product3.png', '/product4.png'], variants: [{ color: 'Blanco', colorHex: '#FFFFFF', image: '/product3.png' }], description: "Mini masajeador para aliviar tensiones." },
  { id: 4, name: 'Solar Charger', price: 199000, oldPrice: 399000, inStock: true, dateAdded: new Date('2025-07-15'), imageUrl: '/product4.png', imageUrl2: '/product5.png', galleryImages: ['/product4.png', '/product5.png'], variants: [{ color: 'Negro', colorHex: '#000000', image: '/product4.png' }], description: "Cargador solar portátil de alta capacidad." },
  { id: 5, name: 'Sink Organizer', price: 139000, oldPrice: 269000, inStock: true, dateAdded: new Date('2025-07-01'), imageUrl: '/product5.png', imageUrl2: '/product6.png', galleryImages: ['/product5.png', '/product6.png'], variants: [{ color: 'Gris', colorHex: '#808080', image: '/product5.png' }], description: "Organizador de fregadero para mantener todo en orden." },
  { id: 6, name: 'Blender Portátil', price: 199000, oldPrice: 385000, inStock: true, dateAdded: new Date('2025-07-18'), imageUrl: '/product6.png', imageUrl2: '/product7.png', galleryImages: ['/product6.png', '/product7.png'], variants: [{ color: 'Verde', colorHex: '#008000', image: '/product6.png' }], description: "Licuadora portátil para tus batidos en cualquier lugar." },
  { id: 7, name: 'Bath Mat Absorbente', price: 129000, oldPrice: 199000, inStock: false, dateAdded: new Date('2025-06-15'), imageUrl: '/product7.png', imageUrl2: '/product8.png', galleryImages: ['/product7.png', '/product8.png'], variants: [{ color: 'Azul', colorHex: '#0000FF', image: '/product7.png' }], description: "Alfombra de baño super absorbente de secado rápido." },
  { id: 8, name: 'Storage Solution', price: 150000, oldPrice: 300000, inStock: true, dateAdded: new Date('2025-07-05'), imageUrl: '/product8.png', imageUrl2: '/product1.png', galleryImages: ['/product8.png', '/product1.png'], variants: [{ color: 'Beige', colorHex: '#F5F5DC', image: '/product8.png' }], description: "Solución de almacenamiento versátil para tu hogar." },
  { id: 9, name: 'Lámpara de Proyección', price: 110000, oldPrice: 180000, inStock: true, dateAdded: new Date('2025-07-20'), imageUrl: '/product4.png', imageUrl2: '/product5.png', galleryImages: ['/product4.png', '/product5.png'], variants: [{ color: 'Negro', colorHex: '#000000', image: '/product4.png' }], description: "Proyecta galaxias en tu habitación." },
  { id: 10, name: 'Dispensador de Jabón', price: 79000, oldPrice: 129000, inStock: true, dateAdded: new Date('2025-07-22'), imageUrl: '/product3.png', imageUrl2: '/product4.png', galleryImages: ['/product3.png', '/product4.png'], variants: [{ color: 'Blanco', colorHex: '#FFFFFF', image: '/product3.png' }], description: "Dispensador automático de jabón sin contacto." },
  { id: 11, name: 'Cepillo Eléctrico', price: 199000, oldPrice: 250000, inStock: false, dateAdded: new Date('2025-07-23'), imageUrl: '/product6.png', imageUrl2: '/product7.png', galleryImages: ['/product6.png', '/product7.png'], variants: [{ color: 'Verde', colorHex: '#008000', image: '/product6.png' }], description: "Cepillo de limpieza eléctrico para múltiples superficies." },
  { id: 12, name: 'Handy Heater', price: 149000, oldPrice: 299000, imageUrl: '/product2.png', imageUrl2: '/product3.png', inStock: true, dateAdded: new Date('2025-07-12'), galleryImages: ['/product2.png', '/product3.png'], variants: [{ color: 'Negro', colorHex: '#000000', image: '/product2.png' }], description: "Calentador personal portátil y compacto." },
];

const MIN_PRICE = 0;
const MAX_PRICE = 500000;
const PRODUCTS_PER_PAGE = 4;

export default function TiendaPage() {
  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('caracteristicas');
  const [columns, setColumns] = useState(3);
  const [priceInputs, setPriceInputs] = useState({ min: priceRange[0].toLocaleString('es-PY'), max: priceRange[1].toLocaleString('es-PY') });
  const [openFilters, setOpenFilters] = useState({ availability: true, price: true });
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilterSection = (name: keyof typeof openFilters) => { setOpenFilters(prev => ({ ...prev, [name]: !prev[name] })); };
  const availabilityCounts = useMemo(() => ({ inStock: allProducts.filter(p => p.inStock).length, outOfStock: allProducts.filter(p => !p.inStock).length }), []);
  
  useEffect(() => { setPriceInputs({ min: priceRange[0].toLocaleString('es-PY'), max: priceRange[1].toLocaleString('es-PY') }) }, [priceRange]);
  
  useEffect(() => { setCurrentPage(1); }, [availability, priceRange, sortBy]);
  
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    if (availability.length > 0) {
        const inStockSelected = availability.includes('in-stock');
        const outOfStockSelected = availability.includes('out-of-stock');
        if (inStockSelected && !outOfStockSelected) { products = products.filter(p => p.inStock); } 
        else if (!inStockSelected && outOfStockSelected) { products = products.filter(p => !p.inStock); }
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
        case 'precio-asc': products.sort((a, b) => a.price - b.price); break;
        case 'precio-desc': products.sort((a, b) => b.price - a.price); break;
        case 'nombre-asc': products.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'nombre-desc': products.sort((a, b) => b.name.localeCompare(a.name)); break;
        case 'fecha-desc': products.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()); break;
        case 'fecha-asc': products.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime()); break;
    }
    return products;
  }, [availability, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAvailabilityChange = (value: string) => { setAvailability(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]) };
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => { const value = e.target.value.replace(/\D/g, ''); setPriceInputs(prev => ({ ...prev, [type]: value ? parseInt(value, 10).toLocaleString('es-PY') : '' })) };
  const handlePriceInputBlur = () => { const min = parseInt(priceInputs.min.replace(/\./g, ''), 10) || MIN_PRICE; const max = parseInt(priceInputs.max.replace(/\./g, ''), 10) || MAX_PRICE; setPriceRange(min > max ? [max, min] : [min, max]) };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) { for (let i = 1; i <= totalPages; i++) { pageNumbers.push(i); } } 
    else {
      if (currentPage <= 2) { pageNumbers.push(1, 2, 3); } 
      else if (currentPage >= totalPages - 1) { pageNumbers.push(totalPages - 2, totalPages - 1, totalPages); } 
      else { pageNumbers.push(currentPage - 1, currentPage, currentPage + 1); }
    }
    return pageNumbers;
  };

  return (
    <div className="shop-container">
      <div className="shop-header"><p className="breadcrumb">Home / Home page</p><h1>Home page</h1></div>
      <div className="shop-layout">
        <aside className="filters-sidebar">
            <div className="filter-group"><h3 className="filter-title-main">TODO</h3><div className="active-filters-container">{availability.map((filterValue) => ( <div key={filterValue} className="active-filter-badge"><span>{filterValue === 'in-stock' ? 'En existencia' : 'Agotado'}</span><button onClick={() => handleAvailabilityChange(filterValue)} className="remove-filter-btn"><IconX /></button></div> ))}</div></div>
            <div className="filter-group"><button className="filter-title" onClick={() => toggleFilterSection('availability')}><span>Availability</span><span className={`filter-chevron ${openFilters.availability ? 'open' : ''}`}><IconChevron /></span></button><div className={`filter-content ${openFilters.availability ? 'open' : ''}`}><div className="filter-option"><input type="checkbox" id="in-stock" checked={availability.includes('in-stock')} onChange={() => handleAvailabilityChange('in-stock')} /><label htmlFor="in-stock">En existencia ({availabilityCounts.inStock})</label></div><div className="filter-option"><input type="checkbox" id="out-of-stock" checked={availability.includes('out-of-stock')} onChange={() => handleAvailabilityChange('out-of-stock')} /><label htmlFor="out-of-stock">Agotado ({availabilityCounts.outOfStock})</label></div></div></div>
            <div className="filter-group"><button className="filter-title" onClick={() => toggleFilterSection('price')}><span>Price</span><span className={`filter-chevron ${openFilters.price ? 'open' : ''}`}><IconChevron /></span></button><div className={`filter-content ${openFilters.price ? 'open' : ''}`}><Slider.Root className="SliderRoot" value={priceRange} min={MIN_PRICE} max={MAX_PRICE} step={10000} minStepsBetweenThumbs={1} onValueChange={(value) => setPriceRange(value as [number, number])}><Slider.Track className="SliderTrack"><Slider.Range className="SliderRange" /></Slider.Track><Slider.Thumb className="SliderThumb" /><Slider.Thumb className="SliderThumb" /></Slider.Root><div className="price-input-container"><div className="price-input-wrapper"><span>Gs.</span><input type="text" className="price-input" value={priceInputs.min} onChange={(e) => handlePriceInputChange(e, 'min')} onBlur={handlePriceInputBlur} /></div><div className="price-input-wrapper"><span>Gs.</span><input type="text" className="price-input" value={priceInputs.max} onChange={(e) => handlePriceInputChange(e, 'max')} onBlur={handlePriceInputBlur} /></div></div></div></div>
        </aside>

        <main className="product-grid-area">
            <div className="product-controls">
                <div className="view-toggles"><button onClick={() => setColumns(2)} className={columns === 2 ? 'active' : ''}><IconColumns2 /></button><button onClick={() => setColumns(3)} className={columns === 3 ? 'active' : ''}><IconColumns3 /></button><button onClick={() => setColumns(4)} className={columns === 4 ? 'active' : ''}><IconColumns4 /></button></div>
                <div className="sort-by"><label htmlFor="sort">Ordenar:</label><select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="caracteristicas">Características</option><option value="mas-vendidos">Más vendidos</option><option value="nombre-asc">Alfabéticamente, A-Z</option><option value="nombre-desc">Alfabéticamente, Z-A</option><option value="precio-asc">Precio, menor a mayor</option><option value="precio-desc">Precio, mayor a menor</option><option value="fecha-desc">Fecha: reciente a antiguo(a)</option><option value="fecha-asc">Fecha: antiguo(a) a reciente</option></select></div>
            </div>

          <div className={`product-grid-shop columns-${columns}`}>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <a key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
                  <div className="shop-product-card">
                    <div className="image-container">
                      {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                      <img src={product.imageUrl} alt={product.name} className="shop-product-image-primary" width="250" height="250" style={{ objectFit: 'contain' }} />
                      <img src={product.imageUrl2} alt={product.name} className="shop-product-image-secondary" width="250" height="250" style={{ objectFit: 'contain' }} />
                    </div>
                    <h4>{product.name}</h4>
                    <div className="price-section">
                      <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
                      {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
                    </div>
                  </div>
                </a>
              ))
            ) : ( <p className="no-products-message">No se encontraron productos con estos filtros.</p> )}
          </div>
          
          <div className="pagination">
            <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>&lt;</button>
            {getPageNumbers().map(number => ( <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>{number}</button> ))}
            <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages || totalPages === 0}>&gt;</button>
          </div>
        </main>
      </div>
    </div>
  );
}
