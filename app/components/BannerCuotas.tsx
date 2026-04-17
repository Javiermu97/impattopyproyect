'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

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

  const scrollEscritorio = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cellWidth = 110;
      const scrollTo = direction === 'left'
        ? scrollRef.current.scrollLeft - cellWidth * 3
        : scrollRef.current.scrollLeft + cellWidth * 3;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bristol-fix-container">

      {/* ── ESCRITORIO (sin cambios) ── */}
      <div className="bristol-fix-wrapper bristol-desktop-only">
        <div className="bristol-fix-label">
          <p>Comprá en cuotas</p>
          <p className="gold-text">sin intereses</p>
        </div>
        <div className="bristol-fix-slider">
          <button className="fix-nav-btn left" onClick={() => scrollEscritorio('left')}>‹</button>
          <div className="fix-scroll-area" ref={scrollRef}>
            <div className="fix-track">
              {listaLogos.map((logo, i) => (
                <div key={i} className="fix-logo-item">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
          <button className="fix-nav-btn right" onClick={() => scrollEscritorio('right')}>›</button>
        </div>
      </div>

      {/* ── MÓVIL/TABLET (logos individuales con Swiper) ── */}
      <div className="bristol-mobile-only">
        <div className="bristol-swiper-container">
          <div className="bristol-mobile-label">
            <span>Comprá en cuotas</span>
            <span className="gold-text"> sin intereses</span>
          </div>
          <Swiper
            modules={[Autoplay, Scrollbar]}
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 12000,
              disableOnInteraction: false,
            }}
            scrollbar={{
              draggable: true,
            }}
            className="mySwiper"
          >
            {listaLogos.map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="bristol-mobile-logo-card">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  );
}
