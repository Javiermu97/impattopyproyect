'use client';

import React, { useState, useEffect, useRef } from 'react';

const InfoBanner = () => {
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
        threshold: 0.1, // La animación empieza cuando el 10% del elemento es visible
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

  return (
    <section 
      ref={bannerRef} 
      className={`info-banner-section ${isBannerVisible ? 'visible' : ''}`}
    >
      <div className="info-banner-container">
        <div className="info-banner-item">
          <div className="info-icon">🚚</div>
          <h3>Envíos gratis</h3>
          <p>Envíos en 24/48hrs disponible a todo el País</p>
        </div>
        <div className="info-banner-item">
          <div className="info-icon">🌿</div>
          <h3>Empresa sustentable</h3>
          <p>Priorizamos la sustentabilidad con el medio ambiente</p>
        </div>
        <div className="info-banner-item">
          <div className="info-icon">💵</div>
          <h3>Pagá al recibir</h3>
          <p>Ofrecemos el pago contra entrega</p>
        </div>
        <div className="info-banner-item">
          <div className="info-icon">💬</div>
          <h3>Atención al cliente</h3>
          <p>Disponible 8:30 a 18:00hs vía WhatsApp</p>
        </div>
      </div>
    </section>
  );
};

export default InfoBanner;