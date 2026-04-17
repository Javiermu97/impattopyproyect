'use client';

import { useRef, useEffect } from 'react';

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

const logosLoop = [...listaLogos, ...listaLogos];

export default function BannerCuotas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      const scrollTo = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      isPausedRef.current = true;
      setTimeout(() => { isPausedRef.current = false; }, 3000);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth > 992) return;

    let lastTime = 0;
    const speed = 0.6; // px por ms ajustable

    const animate = (timestamp: number) => {
      if (!isPausedRef.current && el) {
        const delta = timestamp - lastTime;
        el.scrollLeft += speed * delta;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      lastTime = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section className="bristol-fix-container">
      {/* Vista ESCRITORIO — sin cambios */}
      <div className="bristol-fix-wrapper bristol-desktop-only">
        <div className="bristol-fix-label">
          <p>Comprá en cuotas</p>
          <p className="gold-text">sin intereses</p>
        </div>
        <div className="bristol-fix-slider">
          <button className="fix-nav-btn left" onClick={() => scroll('left')}>‹</button>
          <div className="fix-scroll-area" ref={scrollRef}>
            <div className="fix-track">
              {listaLogos.map((logo, i) => (
                <div key={i} className="fix-logo-item">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
          <button className="fix-nav-btn right" onClick={() => scroll('right')}>›</button>
        </div>
      </div>

      {/* Vista MÓVIL/TABLET */}
      <div className="bristol-mobile-only">
        <div className="bristol-mobile-header">
          <p>Comprá en cuotas</p>
          <p className="gold-text">sin intereses</p>
        </div>
        <div className="bristol-mobile-track-wrapper">
          <button className="fix-nav-btn left bristol-mobile-arrow" onClick={() => scroll('left')}>‹</button>
          <div
            className="bristol-mobile-scroll"
            ref={scrollRef}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => { setTimeout(() => { isPausedRef.current = false; }, 3000); }}
          >
            <div className="bristol-mobile-grid">
              {logosLoop.map((logo, i) => (
                <div key={i} className="bristol-mobile-logo">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
          <button className="fix-nav-btn right bristol-mobile-arrow" onClick={() => scroll('right')}>›</button>
        </div>
      </div>
    </section>
  );
}