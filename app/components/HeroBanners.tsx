'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './HeroBanners.module.css';

const banners = {
  hero: [
    '/banners/hero/hero-1.jpg',
    '/banners/hero/hero-2.jpg',
    '/banners/hero/hero-3.jpg',
  ],
  heroChico: [
    '/banners/hero-chico/hero-chico-1.jpg',
    '/banners/hero-chico/hero-chico-2.jpg',
  ],
  wide: [
    '/banners/wide/wide-1.jpg',
    '/banners/wide/wide-2.jpg',
  ],
  cat1: { src: '/banners/cat-1/cat-1.jpg', href: '/products/26' },
  cat2: { src: '/banners/cat-2/cat-2.jpg', href: '/products/proximamente' },
  sq1:  { src: '/banners/sq-1/sq-1.jpg',   href: '/products/44' },
  sq2:  { src: '/banners/sq-2/sq-2.jpg',   href: '/products/proximamente' },
};

const CarruselSlot = ({ images, className }: { images: string[]; className: string }) => (
  <div className={`${styles.slot} ${className}`}>
    <Swiper
      modules={[Autoplay, Navigation]}
      loop={true}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      navigation={true}
      className={styles.swiper}
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} alt={`banner-${i + 1}`} className={styles.bannerImg} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const ImagenFija = ({ src, href, className }: { src: string; href: string; className: string }) => (
  <div className={`${styles.slot} ${className}`}>
    <Link href={href}>
      <img src={src} alt="banner" className={styles.bannerImg} />
    </Link>
  </div>
);

export default function HeroBanners() {
  return (
    <section className={styles.heroGrid}>

      {/* ── ESCRITORIO ── */}
      <div className={styles.desktopLayout}>
        <CarruselSlot images={banners.hero}      className={styles.slotHeroGrande} />
        <ImagenFija   {...banners.cat1}           className={styles.slotCat1} />
        <ImagenFija   {...banners.cat2}           className={styles.slotCat2} />
        <CarruselSlot images={banners.wide}       className={styles.slotWide} />
        <CarruselSlot images={banners.heroChico}  className={styles.slotHeroChico} />
        <ImagenFija   {...banners.sq1}            className={styles.slotSq1} />
        <ImagenFija   {...banners.sq2}            className={styles.slotSq2} />
      </div>

      {/* ── MÓVIL ── */}
      <div className={styles.mobileLayout}>
        <CarruselSlot images={banners.hero}      className={styles.slotGrande} />
        <CarruselSlot images={banners.heroChico} className={styles.slotChico} />
        <div className={styles.fila}>
          <ImagenFija {...banners.cat1} className={styles.slotCat} />
          <ImagenFija {...banners.cat2} className={styles.slotCat} />
        </div>
        <CarruselSlot images={banners.wide}      className={styles.slotWide} />
        <div className={styles.fila}>
          <ImagenFija {...banners.sq1} className={styles.slotSq} />
          <ImagenFija {...banners.sq2} className={styles.slotSq} />
        </div>
      </div>

    </section>
  );
}