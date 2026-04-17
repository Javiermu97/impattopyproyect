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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      const scrollTo = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bristol-banner-container">
      <div className="bristol-banner-wrapper">
        
        <div className="bristol-label">
          <p>Comprá</p>
          <p>en cuotas</p>
          <p className="highlight">sin intereses</p>
        </div>

        <div className="bristol-slider-main">
          {canScrollLeft && (
            <button className="bristol-nav-btn left" onClick={() => scroll('left')}>‹</button>
          )}

          <div className="bristol-scroll-viewport" ref={scrollRef} onScroll={checkScroll}>
            <div className="bristol-logos-track">
              {listaLogos.map((logo, i) => (
                <div key={i} className="bristol-logo-box">
                  <img src={logo.src} alt={logo.alt} title={logo.alt} />
                </div>
              ))}
            </div>
          </div>

          {canScrollRight && (
            <button className="bristol-nav-btn right" onClick={() => scroll('right')}>›</button>
          )}
        </div>

      </div>
    </section>
  );
}