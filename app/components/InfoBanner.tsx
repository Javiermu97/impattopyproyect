'use client';

import React, { useState, useEffect, useRef } from 'react';
// 1. Importamos los íconos que vamos a usar
import { TbTruckDelivery, TbLock, TbCreditCard, TbMessageCircle } from "react-icons/tb";

const InfoBanner = () => {
  const bannerRef = useRef<HTMLElement>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
  requestAnimationFrame(() => {
    setIsBannerVisible(true);
  });
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
      {/* ===== ESTE ES EL DIV ADICIONAL QUE SOLUCIONA EL PROBLEMA ===== */}
      <div className="info-banner-content-wrapper">
        <div className="info-banner-container">
          {/* Item 1: Entrega Gratis */}
          <div className="info-banner-item">
            <div className="info-icon"><TbTruckDelivery /></div>
            <div className="info-text">
              <h3>Entrega Gratis</h3>
              <p>En productos seleccionados</p>
            </div>
          </div>
          {/* Item 2: Compra Garantizada */}
          <div className="info-banner-item">
            <div className="info-icon"><TbLock /></div>
            <div className="info-text">
              <h3>Compra Garantizada</h3>
              <p>Garantía en todos los artículos</p>
            </div>
          </div>
          {/* Item 3: Pago Rápido y Seguro */}
          <div className="info-banner-item">
            <div className="info-icon"><TbCreditCard /></div>
            <div className="info-text">
              <h3>Pago Rápido y Seguro</h3>
              <p>Efectivo y Tarjetas de Crédito</p>
            </div>
          </div>
          {/* Item 4: Asesoramiento en Línea */}
          <div className="info-banner-item">
            <div className="info-icon"><TbMessageCircle /></div>
            <div className="info-text">
              <h3>Asesoramiento en Línea</h3>
              <p>¿Dudas? Aquí estamos...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBanner;