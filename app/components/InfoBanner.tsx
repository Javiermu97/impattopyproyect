import React from 'react';

const InfoBanner = () => {
  return (
    <section className="info-banner-section">
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