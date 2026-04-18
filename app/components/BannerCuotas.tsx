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
    <section className="banner-pagos-container">

      {/* ══ ESCRITORIO ══ */}
      <div className="banner-pagos-wrapper banner-pagos-desktop">
        <div className="banner-pagos-label">
          <p>Pagá como</p>
          <p className="banner-pagos-destacado">más desees</p>
        </div>

        <div className="banner-pagos-slider">
          <button className="banner-pagos-btn banner-pagos-btn--left banner-pagos-prev-desk">‹</button>

          <Swiper
            modules={[Navigation]}
            loop={true}
            speed={600}
            slidesPerView={'auto'}
            spaceBetween={0}
            navigation={{
              prevEl: '.banner-pagos-prev-desk',
              nextEl: '.banner-pagos-next-desk',
            }}
            onSlideChange={mostrarScrollbar}
            className="banner-pagos-swiper-desk"
          >
            {[...listaLogos, ...listaLogos].map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="banner-pagos-logo-item">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="banner-pagos-btn banner-pagos-btn--right banner-pagos-next-desk">›</button>
        </div>
      </div>

      {/* ══ MÓVIL/TABLET ══ */}
      <div className="banner-pagos-mobile">
        <div className="banner-pagos-swiper-container">
          <div className="banner-pagos-swiper-wrapper">
            <button className="banner-pagos-arrow banner-pagos-arrow--left">‹</button>

            <Swiper
              modules={[Autoplay, Navigation]}
              loop={true}
              speed={800}
              autoplay={{
                delay: 12000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: '.banner-pagos-arrow--left',
                nextEl: '.banner-pagos-arrow--right',
              }}
              onSlideChange={mostrarScrollbar}
              className="banner-pagos-swiper"
            >
              <SwiperSlide>
                <img
                  src={rutaImagenPanorama}
                  alt="Medios de pago y cuotas"
                  className="banner-pagos-img"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={rutaImagenPanorama}
                  alt="Medios de pago y cuotas"
                  className="banner-pagos-img"
                />
              </SwiperSlide>
            </Swiper>

            <button className="banner-pagos-arrow banner-pagos-arrow--right">›</button>
          </div>

          <div className={`banner-pagos-scrollbar ${scrollbarVisible ? 'visible' : ''}`}>
            <div className="banner-pagos-scrollbar-track">
              <div className="banner-pagos-scrollbar-indicator"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

