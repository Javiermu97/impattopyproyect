'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import CarruselInferior from './components/CarruselInferior';
import React, { useState, useEffect, useRef } from 'react';

// Esta es tu página de inicio original y única
export default function HomePage() {
  const bannerRef = useRef<HTMLElement>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBannerVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = bannerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const trendingProducts = [
    { id: 1, name: 'Door Draft Excluder', price: 'Gs. 150.000', oldPrice: 'Gs. 299.000', imageUrl: '/product1.png', imageUrl2: '/product2.png', offer: true },
    { id: 2, name: 'Handy Heater', price: 'Gs. 149.000', oldPrice: 'Gs. 299.000', imageUrl: '/product2.png', imageUrl2: '/product1.png', offer: true },
    { id: 3, name: 'Mini Masajeador', price: 'Gs. 149.000', oldPrice: 'Gs. 299.000', imageUrl: '/product3.png', imageUrl2: '/product4.png', offer: true },
    { id: 4, name: 'Solar Charger', price: 'Gs. 199.000', oldPrice: 'Gs. 399.000', imageUrl: '/product4.png', imageUrl2: '/product3.png', offer: true },
    { id: 5, name: 'Sink Organizer', price: 'Gs. 139.000', oldPrice: 'Gs. 269.000', imageUrl: '/product5.png', imageUrl2: '/product6.png', offer: true },
    { id: 6, name: 'Blender', price: 'Gs. 199.000', oldPrice: 'Gs. 385.000', imageUrl: '/product6.png', imageUrl2: '/product5.png', offer: true },
    { id: 7, name: 'Bath Mat', price: 'Gs. 129.000', oldPrice: 'Gs. 199.000', imageUrl: '/product7.png', imageUrl2: '/product8.png', offer: true },
    { id: 8, name: 'Storage Solution', price: 'Gs. 150.000', oldPrice: 'Gs. 300.000', imageUrl: '/product8.png', imageUrl2: '/product7.png', offer: true },
  ];

  const newArrivals = [
    { id: 5, name: 'Sink Organizer', price: 'Gs. 139.000', oldPrice: 'Gs. 269.000', imageUrl: '/product5.png', imageUrl2: '/product6.png', offer: true },
    { id: 6, name: 'Blender', price: 'Gs. 199.000', oldPrice: 'Gs. 385.000', imageUrl: '/product6.png', imageUrl2: '/product5.png', offer: true },
    // ... otros productos
  ];

  return (
    <>
      {/* Carrusel Inferior */}
      <CarruselInferior />
      {/* Hero Section con Video de Fondo */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/video/quita-pelusas.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        <div className="hero-content">
          <h2>CONOCE NUESTROS PRODUCTOS</h2>
          <h1>Tendencias y regalos originales</h1>
          <p>Encuentra una amplia gama de productos que se adaptan a tu estilo de vida</p>
          <Link href="/tienda">
            <button className="btn-primary">EMPEZAR VIAJE</button>
          </Link>
        </div>
      </section>

      

      {/* Promociones Únicas Section */}
      <section className="products-section products-section-gray">
        <h2 className="section-title">🔥Especial de la Semana <span role="img" aria-label="fire">🔥</span></h2>
        <div className="product-grid-shop columns-4">
          {trendingProducts.map(product => (
            <Link key={product.id} href={`/products/${product.id}?category=mas-vendidos`} className="shop-product-card-link">
              <div className="shop-product-card">
                <div className="image-container">
                  {product.offer && <span className="shop-offer-badge">Oferta</span>}
                  <Image src={product.imageUrl} alt={product.name} width={250} height={250} className="shop-product-image-primary" style={{ objectFit: 'contain' }} />
                  <Image src={product.imageUrl2} alt={product.name} width={250} height={250} className="shop-product-image-secondary" style={{ objectFit: 'contain' }} />
                </div>
                <h4>{product.name}</h4>
                <div className="price-section">
                  <span className="shop-product-price">{product.price}</span>
                  {product.oldPrice && <span className="shop-product-old-price">{product.oldPrice}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/mas-vendidos">
          <button className="btn-secondary">VER TODOS</button>
        </Link>
      </section>

      {/* Lanzamientos Section */}
      <section className="products-section">
        <h2 className="section-title">Confort y Diseño</h2>
        <h3 className="section-subtitle"> Hechos para tu hogar <span role="img" aria-label="house">🏠</span></h3>
        <div className="product-grid-shop columns-4">
          {[
            { id: 5, name: 'Sink Organizer', price: 'Gs. 139.000', oldPrice: 'Gs. 269.000', imageUrl: '/product5.png', imageUrl2: '/product6.png', offer: true },
            { id: 6, name: 'Blender', price: 'Gs. 199.000', oldPrice: 'Gs. 385.000', imageUrl: '/product6.png', imageUrl2: '/product5.png', offer: true },
            { id: 7, name: 'Bath Mat', price: 'Gs. 129.000', oldPrice: 'Gs. 199.000', imageUrl: '/product7.png', imageUrl2: '/product8.png', offer: true },
            { id: 8, name: 'Storage Solution', price: 'Gs. 150.000', oldPrice: 'Gs. 300.000', imageUrl: '/product8.png', imageUrl2: '/product7.png', offer: true },
            { id: 1, name: 'Door Draft Excluder', price: 'Gs. 150.000', oldPrice: 'Gs. 299.000', imageUrl: '/product1.png', imageUrl2: '/product2.png', offer: true },
            { id: 2, name: 'Handy Heater', price: 'Gs. 149.000', oldPrice: 'Gs. 299.000', imageUrl: '/product2.png', imageUrl2: '/product1.png', offer: true },
            { id: 3, name: 'Mini Masajeador', price: 'Gs. 149.000', oldPrice: 'Gs. 299.000', imageUrl: '/product3.png', imageUrl2: '/product4.png', offer: true },
            { id: 4, name: 'Solar Charger', price: 'Gs. 199.000', oldPrice: 'Gs. 399.000', imageUrl: '/product4.png', imageUrl2: '/product3.png', offer: true },
          ].map(product => (
            <Link key={product.id} href="/hogar-cocina" className="shop-product-card-link">
              <div className="shop-product-card">
                <div className="image-container">
                  {product.offer && <span className="shop-offer-badge">Oferta</span>}
                  <Image src={product.imageUrl} alt={product.name} width={250} height={250} className="shop-product-image-primary" />
                  {product.imageUrl2 && <Image src={product.imageUrl2} alt={product.name} width={250} height={250} className="shop-product-image-secondary" />}
                </div>
                <h4>{product.name}</h4>
                <div className="price-section">
                  <span className="shop-product-price">{product.price}</span>
                  {product.oldPrice && <span className="shop-product-old-price">{product.oldPrice}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/hogar-cocina">
            <button className="btn-secondary">VER TODOS</button>
        </Link>
      </section>

      {/* Nuestra Filosofía Section */}
      <section className="philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-image-container">
            <Image src="/filosofia-1.jpg" alt="Mujer trabajando en un mostrador" width={450} height={300} className="philosophy-img philosophy-img-bg" />
            <Image src="/filosofia-2.jpg" alt="Personas revisando un catálogo" width={450} height={300} className="philosophy-img philosophy-img-fg" />
          </div>
          <div className="philosophy-content">
            <p className="philosophy-pre-title">IMPATTO PY</p>
            <h2>Nuestra Filosofía</h2>
            <p>Es brindar la mejor experiencia a nuestra comunidad...</p>
            <p><strong>Más de 20mil clientes Paraguayos confiaron en nosotros...</strong></p>
            <button className="btn-primary">CONÓCENOS</button>
          </div>
        </div>
      </section>

      {/* Franja Azul Informativa (Restaurada aquí) */}
      <section 
        ref={bannerRef} 
        className={`info-banner-section ${isBannerVisible ? 'visible' : ''}`}
      >
        <div className="info-banner-container">
          <div className="info-banner-item">
            <div className="info-icon">🚚</div>
            <h3>Envío Exprés Gratis</h3>
            <p>A todo el país en 24/48 hs</p>
          </div>
          <div className="info-banner-item">
            <div className="info-icon">🌿</div>
            <h3>Sustentable & Responsable</h3>
            <p>Comprá cuidando el planeta</p>
          </div>
          <div className="info-banner-item">
            <div className="info-icon">💵</div>
            <h3>Pagá Fácil</h3>
            <p>Ofrecemos el pago contra entrega</p>
          </div>
          <div className="info-banner-item">
            <div className="info-icon">💬</div>
            <h3>Soporte Directo</h3>
            <p>WhatsApp 8:30 a 18:00 hsWhatsApp 8:30 a 18:00 hs</p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/595983491155" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
        <FaWhatsapp size={22} />
        Contáctanos
      </a>
    </>
  );
}