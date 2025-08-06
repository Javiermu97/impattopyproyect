'use client';

import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

// --- TIPOS Y COMPONENTES ---

type Product = { 
  id: number; 
  name: string; 
  price: number; 
  oldPrice?: number | null; // <-- CAMBIO AQUÍ: Ahora acepta 'number', 'null', o 'undefined'oldPrice?: number | null; // 
  inStock: boolean; 
  dateAdded: string;
  imageUrl: string; 
  imageUrl2: string;
};

// NUEVO TIPO: Representa la fila como viene de la tabla 'productos'
type ProductFromDB = {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  inStock: boolean;
  created_at: string;
  imageUrl: string;
  imageUrl2: string;
};

const IconColumns2 = () => ( <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}><rect x="2" y="2" width="5" height="12" rx="1"></rect><rect x="9" y="2" width="5" height="12" rx="1"></rect></svg> );
const IconColumns3 = () => ( <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}><rect x="1.5" y="2" width="3.66" height="12" rx="1"></rect><rect x="6.16" y="2" width="3.66" height="12" rx="1"></rect><rect x="10.82" y="2" width="3.66" height="12" rx="1"></rect></svg> );
const IconColumns4 = () => ( <svg viewBox="0 0 16 16" fill="currentColor" height="1.2em" width="1.2em" style={{ display: 'block' }}><rect x="1.5" y="2" width="2.5" height="12" rx="0.5"></rect><rect x="5" y="2" width="2.5" height="12" rx="0.5"></rect><rect x="8.5" y="2" width="2.5" height="12" rx="0.5"></rect><rect x="12" y="2" width="2.5" height="12" rx="0.5"></rect></svg> );
const IconX = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708 .708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg> );
const IconChevron = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg> );


// --- VALORES CONSTANTES ---
const MIN_PRICE = 0;
const MAX_PRICE = 500000;
const PRODUCTS_PER_PAGE = 12;

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function TiendaPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Carga los productos desde Supabase cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('productos')
        .select('id, name, price, oldPrice, inStock, created_at, imageUrl, imageUrl2');

      if (error) {
        console.error('Error al cargar los productos:', error);
        setLoading(false);
        return; 
      }

      if (data) {
        const productsFromDB = data as ProductFromDB[]; 
        const formattedData = productsFromDB.map(p => ({ 
            ...p, 
            dateAdded: p.created_at
        }));
        setAllProducts(formattedData);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);


  // --- LÓGICA DE FILTROS Y PAGINACIÓN ---
  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('caracteristicas');
  const [columns, setColumns] = useState(3);
  const [openFilters, setOpenFilters] = useState({ availability: true, price: true });
  const [currentPage, setCurrentPage] = useState(1);
  
  const toggleFilterSection = (name: keyof typeof openFilters) => { setOpenFilters(prev => ({ ...prev, [name]: !prev[name] })); };
  
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
        case 'fecha-desc': products.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break;
        case 'fecha-asc': products.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()); break;
    }
    return products;
  }, [allProducts, availability, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAvailabilityChange = (value: string) => { setAvailability(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]) };

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
  
  if (loading) {
    return <div>Cargando productos...</div>; // Mensaje de carga
  }

  return (
    <div className="shop-container">
      <div className="shop-header"><p className="breadcrumb">Home / Home page</p><h1>Home page</h1></div>
      <div className="shop-layout">
        <aside className="filters-sidebar">
            <div className="filter-group"><h3 className="filter-title-main">TODO</h3><div className="active-filters-container">{availability.map((filterValue) => ( <div key={filterValue} className="active-filter-badge"><span>{filterValue === 'in-stock' ? 'En existencia' : 'Agotado'}</span><button onClick={() => handleAvailabilityChange(filterValue)} className="remove-filter-btn"><IconX /></button></div> ))}</div></div>
            <div className="filter-group"><button className="filter-title" onClick={() => toggleFilterSection('availability')}><span>Availability</span><span className={`filter-chevron ${openFilters.availability ? 'open' : ''}`}><IconChevron /></span></button><div className={`filter-content ${openFilters.availability ? 'open' : ''}`}><div className="filter-option"><input type="checkbox" id="in-stock" checked={availability.includes('in-stock')} onChange={() => handleAvailabilityChange('in-stock')} /><label htmlFor="in-stock">En existencia</label></div><div className="filter-option"><input type="checkbox" id="out-of-stock" checked={availability.includes('out-of-stock')} onChange={() => handleAvailabilityChange('out-of-stock')} /><label htmlFor="out-of-stock">Agotado</label></div></div></div>
        </aside>

        <main className="product-grid-area">
            <div className="product-controls">
                <div className="view-toggles"><button onClick={() => setColumns(2)} className={columns === 2 ? 'active' : ''}><IconColumns2 /></button><button onClick={() => setColumns(3)} className={columns === 3 ? 'active' : ''}><IconColumns3 /></button><button onClick={() => setColumns(4)} className={columns === 4 ? 'active' : ''}><IconColumns4 /></button></div>
                <div className="sort-by"><label htmlFor="sort">Ordenar:</label><select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="caracteristicas">Características</option><option value="mas-vendidos">Más vendidos</option><option value="nombre-asc">Alfabéticamente, A-Z</option><option value="nombre-desc">Alfabéticamente, Z-A</option><option value="precio-asc">Precio, menor a mayor</option><option value="precio-desc">Precio, mayor a menor</option><option value="fecha-desc">Fecha: reciente a antiguo(a)</option><option value="fecha-asc">Fecha: antiguo(a) a reciente</option></select></div>
            </div>

          <div className={`product-grid-shop columns-${columns}`}>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
                  <div className="shop-product-card">
                    <div className="image-container">
                      {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                      <img src={product.imageUrl} alt={product.name} className="shop-product-image-primary" style={{ objectFit: 'contain' }} />
                      {product.imageUrl2 && <img src={product.imageUrl2} alt={product.name} className="shop-product-image-secondary" style={{ objectFit: 'contain' }} />}
                    </div>
                    <h4>{product.name}</h4>
                    <div className="price-section">
                      <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
                      {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
                    </div>
                  </div>
                </Link>
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