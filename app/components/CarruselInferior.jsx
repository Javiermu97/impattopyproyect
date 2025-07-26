// app/components/CarruselInferior.jsx
'use client'; // Aunque es mayormente CSS, para evitar cualquier problema en Next.js, mantendremos 'use client'

import React from 'react';

const CarruselInferior = () => {
  // Los elementos del carrusel, puedes personalizarlos.
  const items = [
    "COMPRA SEGURA Y PROTEGIDA",
    "HASTA UN 50% DE DESCUENTO EN TODA LA WEB",
    "ENVIOS GRATIS EN TODOS TUS PEDIDOS",
    "DEVOLUCIONES FÁCILES",
    "ATENCIÓN AL CLIENTE 24/7",
  ];

  return (
    <div className="franja-descuento">
      <div className="cinta">
        {/* El primer set de elementos */}
        <div className="scroll-text">
          {items.map((item, index) => (
            <span key={`item-1-${index}`}>{item}</span>
          ))}
        </div>
        {/* El segundo set de elementos, para el efecto infinito sin cortes */}
        <div className="scroll-text" aria-hidden="true">
          {items.map((item, index) => (
            <span key={`item-2-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarruselInferior;
