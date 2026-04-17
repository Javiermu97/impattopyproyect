'use client';

import { useRef, useState, useEffect } from 'react';

const listaLogos = [
  { src: '/logos-bancos/americanexpress.png', alt: 'American Express' },
  { src: '/logos-bancos/Mastercard-logo.svg.png', alt: 'Mastercard' },
  { src: '/logos-bancos/bancoatlas.png', alt: 'Banco Atlas' },
  { src: '/logos-bancos/bancobasa.png', alt: 'Banco Basa' },
  { src: '/logos-bancos/bancoGNB.png', alt: 'Banco GNB' },
  { src: '/logos-bancos/familiar.png', alt: 'Banco Familiar' },
  { src: '/logos-bancos/cooperativauniversitaria.png', alt: 'Cooperativa Universitaria' },
  { src: '/logos-bancos/paraguayojaponesa.png', alt: 'Paraguayo Japonesa' },
  { src: '/logos-bancos/tigomoney.png', alt: 'Tigo Money' },
  { src: '/logos-bancos/personalpay.png', alt: 'Personal Pay' },
  { src: '/logos-bancos/girosclaro.png', alt: 'Giros Claro' },
  { src: '/logos-bancos/wally.png', alt: 'Wally' },
  { src: '/logos-bancos/zimple.png', alt: 'Zimple' },
  { src: '/logos-bancos/wepa.png', alt: 'Wepa' },
  { src: '/logos-bancos/aquiPago.png', alt: 'Aquí Pago' },
  { src: '/logos-bancos/pagoexpress.png', alt: 'Pago Express' },
  { src: '/logos-bancos/Cabal_logo.png', alt: 'Cabal' },
];

export default function BannerCuotas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Ajuste de desplazamiento
      const scrollTo = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="banner-bristol-final">
      <div className="banner-bristol-wrapper">
        
        {/* Etiqueta de texto */}
        <div className="banner-bristol-label">
          <p>Comprá</p>
          <p>en cuotas</p>
          <p className="red-text">sin intereses</p>
        </div>

        {/* Contenedor del Carrusel */}
        <div className="banner-bristol-slider">
          
          <button className="bristol-arrow left" onClick={() => scroll('left')}>‹</button>

          <div className="bristol-scroll-container" ref={scrollRef}>
            <div className="bristol-track">
              {listaLogos.map((logo, i) => (
                <div key={i} className="bristol-logo-item">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>

          <button className="bristol-arrow right" onClick={() => scroll('right')}>›</button>
          
        </div>
      </div>
    </section>
  );
}