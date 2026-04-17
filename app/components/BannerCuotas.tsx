'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

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

  const scrollEscritorio = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cellWidth = 110;
      const scrollTo =
        direction === 'left'
          ? scrollRef.current.scrollLeft - cellWidth * 3
          : scrollRef.current.scrollLeft + cellWidth * 3;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bristol-fix-container">

      {/* ══════════════════════════════════════════════ */}
      {/* ══  ESCRITORIO — sin cambios                ══ */}
      {/* ══════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════ */}
      {/* ══  MÓVIL/TABLET — imagen panorámica Bristol ══ */}
      {/* ══════════════════════════════════════════════ */}
      <div className="bristol-mobile-only">
        <div className="bristol-swiper-container">

          <div className="bristol-mobile-label">
            <span>Comprá en cuotas</span>
            <span className="gold-text"> sin intereses</span>
          </div>

          <div className="bristol-swiper-wrapper">
            <button className="bristol-arrow bristol-arrow-left">‹</button>

            <Swiper
  modules={[Autoplay, Scrollbar, Navigation]}
  loop={true}
  speed={800}
  slidesPerView="auto"
  autoplay={{
    delay: 12000,
    disableOnInteraction: false,
  }}
  navigation={{
    prevEl: '.bristol-arrow-left',
    nextEl: '.bristol-arrow-right',
  }}
  scrollbar={{
    draggable: true,
    el: '.bristol-scrollbar',
  }}
  className="bristol-swiper"
>
              <SwiperSlide>
                <img
                  src={rutaImagenPanorama}
                  alt="Medios de pago y cuotas"
                  className="bristol-img-panorama"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={rutaImagenPanorama}
                  alt="Medios de pago y cuotas"
                  className="bristol-img-panorama"
                />
              </SwiperSlide>
            </Swiper>

            <button className="bristol-arrow bristol-arrow-right">›</button>
          </div>

          <div className="bristol-scrollbar-wrapper">
            <div className="bristol-scrollbar"></div>
          </div>

        </div>
      </div>

    </section>
  );
}
