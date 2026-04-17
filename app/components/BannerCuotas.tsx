'use client';

import { useRef, useEffect, useState } from 'react';

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

const rutaImagenPanorama = '/banner-cuotas-panorama.png'; 

export default function BannerCuotas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRefMundo = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const [progreso, setProgreso] = useState(0);

  // --- LÓGICA DE ESCRITORIO (Original) ---
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cellWidth = 110;
      const scrollTo = direction === 'left'
        ? scrollRef.current.scrollLeft - cellWidth * 3
        : scrollRef.current.scrollLeft + cellWidth * 3;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      isPausedRef.current = true;
      setTimeout(() => { isPausedRef.current = false; }, 3000);
    }
  };

  // --- LÓGICA DE MÓVIL (Auto-scroll estilo Bristol) ---
  useEffect(() => {
    const el = scrollRefMundo.current;
    if (!el || typeof window === 'undefined' || window.innerWidth > 992) return;

    let lastTime: number | null = null;
    const speed = 0.04; // Velocidad constante

    const animate = (timestamp: number) => {
      if (lastTime !== null && !isPausedRef.current && el) {
        const delta = timestamp - lastTime;
        el.scrollLeft += speed * delta;

        // Reset para loop infinito (cuando llega a la mitad del scrollWidth)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }

        // Cálculo de la barra de progreso
        const maxScroll = el.scrollWidth / 2 - el.clientWidth;
        const currentScroll = el.scrollLeft % (el.scrollWidth / 2);
        setProgreso((currentScroll / maxScroll) * 100);
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

      {/* ── ESCRITORIO: Manteniendo tu código intacto ── */}
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

      {/* ── MÓVIL: Estilo Bristol con Imagen Única y Barra de Progreso ── */}
      <div className="bristol-mobile-only">
        <div className="bristol-mobile-slider-container">
          
          <button className="bristol-mobile-btn left">‹</button>
          
          <div className="bristol-mobile-scroll" ref={scrollRefMundo}>
            <div className="bristol-panorama-flex">
              {/* Duplicamos la imagen para el loop infinito sin saltos */}
              <img src={rutaImagenPanorama} alt="Banner Cuotas" className="bristol-panorama-img" />
              <img src={rutaImagenPanorama} alt="Banner Cuotas" className="bristol-panorama-img" />
            </div>
          </div>

          <button className="bristol-mobile-btn right">›</button>

          {/* Barra de progreso inferior */}
          <div className="bristol-progress-container">
            <div 
              className="bristol-progress-bar" 
              style={{ width: `${Math.min(progreso, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

    </section>
  );
}