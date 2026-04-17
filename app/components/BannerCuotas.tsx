'use client';

import { useRef } from 'react';

const bancos = [
  { nombre: 'Visa', color: '#1A1F71', texto: '#FFFFFF' },
  { nombre: 'Mastercard', color: '#EB001B', texto: '#FFFFFF' },
  { nombre: 'Tigo Money', color: '#00377A', texto: '#FFFFFF' },
  { nombre: 'Personal Pay', color: '#E4002B', texto: '#FFFFFF' },
  { nombre: 'Giros Claro', color: '#DA291C', texto: '#FFFFFF' },
  { nombre: 'Wally', color: '#6C3CE1', texto: '#FFFFFF' },
  { nombre: 'Zimple', color: '#00B140', texto: '#FFFFFF' },
  { nombre: 'Pago QR', color: '#003087', texto: '#FFFFFF' },
  { nombre: 'Wepa', color: '#F5A623', texto: '#FFFFFF' },
  { nombre: 'Aquí Pago', color: '#E31837', texto: '#FFFFFF' },
  { nombre: 'Pago Express', color: '#FF6600', texto: '#FFFFFF' },
  { nombre: 'Banco GNB', color: '#004A97', texto: '#FFFFFF' },
  { nombre: 'Banco Familiar', color: '#00843D', texto: '#FFFFFF' },
  { nombre: 'BNF', color: '#003087', texto: '#FFFFFF' },
  { nombre: 'Banco Atlas', color: '#C8102E', texto: '#FFFFFF' },
];

export default function BannerCuotas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Desplaza la mitad del ancho visible por cada clic
      const scrollAmount = clientWidth * 0.5; 
      const scrollTo = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="banner-cuotas-container">
      <div className="banner-cuotas-content">
        <span className="banner-cuotas-label">COMPRÁ EN CUOTAS:</span>
        
        {/* Botón Izquierda */}
        <button className="nav-btn left" onClick={() => scroll('left')} aria-label="Desplazar izquierda">
          ‹
        </button>
        
        <div className="banner-cuotas-scroll" ref={scrollRef}>
          <div className="banner-cuotas-track">
            {bancos.map((banco, i) => (
              <div
                key={i}
                className="banner-cuota-item"
                style={{ backgroundColor: banco.color, color: banco.texto }}
              >
                {banco.nombre}
              </div>
            ))}
          </div>
        </div>

        {/* Botón Derecha */}
        <button className="nav-btn right" onClick={() => scroll('right')} aria-label="Desplazar derecha">
          ›
        </button>
      </div>
    </div>
  );
}