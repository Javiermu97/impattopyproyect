'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
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
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const scrollbarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mostrarScrollbar = () => {
    setScrollbarVisible(true);
    if (scrollbarTimer.current) clearTimeout(scrollbarTimer.current);
    scrollbarTimer.current = setTimeout(() => setScrollbarVisible(false), 1500);
  };

  return (
    <section className="bristol-fix-container">

      {/* ══ ESCRITORIO ══ */}
      <div className="bristol-fix-wrapper bristol-desktop-only">
        <div className="bristol-fix-label">
          <p>Pagá como</p>
          <p className="gold-text">más desees</p>
        </div>

        <div className="bristol-fix-slider">
          <button className="fix-nav-btn left bristol-arrow-left-desk">‹</button>

          <Swiper
            modules={[Navigation]}
            loop={true}
            speed={600}
            slidesPerView={'auto'}
            spaceBetween={8}
            navigation={{
              prevEl: '.bristol-arrow-left-desk',
              nextEl: '.bristol-arrow-right-desk',
            }}
            onSlideChange={mostrarScrollbar}
            className="bristol-swiper-desk"
          >
            {[...listaLogos, ...listaLogos].map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="fix-logo-item">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="fix-nav-btn right bristol-arrow-right-desk">›</button>
        </div>
      </div>

      {/* ══ MÓVIL/TABLET ══ */}
      <div className="bristol-mobile-only">
        <div className="bristol-swiper-container">
          <div className="bristol-swiper-wrapper">
            <button className="bristol-arrow bristol-arrow-left">‹</button>

            <Swiper
              modules={[Autoplay, Navigation]}
              loop={true}
              speed={800}
              autoplay={{
                delay: 12000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: '.bristol-arrow-left',
                nextEl: '.bristol-arrow-right',
              }}
              onSlideChange={mostrarScrollbar}
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

          <div className={`bristol-scrollbar-wrapper ${scrollbarVisible ? 'visible' : ''}`}>
            <div className="bristol-scrollbar-track">
              <div className="bristol-scrollbar-indicator"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}


