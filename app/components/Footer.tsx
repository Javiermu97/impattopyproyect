'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

// Sub-componente para las columnas desplegables en móvil
const FooterAccordionCol = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="footer-col">
      <div className="footer-accordion-title" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`footer-accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  // Lista de logos basada en tus archivos reales
  const logosFooter = [
    { src: '/logos-bancos/americanexpress.png', alt: 'American Express' },
    { src: '/logos-bancos/Mastercard-logo.svg.png', alt: 'Mastercard' },
    { src: '/logos-bancos/bancoatlas.png', alt: 'Banco Atlas' },
    { src: '/logos-bancos/bancobasa.png', alt: 'Banco Basa' },
    { src: '/logos-bancos/bancoGNB.png', alt: 'Banco GNB' },
    { src: '/logos-bancos/cooperativauniversitaria.png', alt: 'Cooperativa Universitaria' },
    { src: '/logos-bancos/familiar.png', alt: 'Banco Familiar' },
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

  return (
    <footer className="footer">
      <div className="footer-content">
        <FooterAccordionCol title="Sobre Nosotros">
          <p>Bienvenido a nuestra tienda, tu destino para encontrar una amplia gama de productos que se adaptan a tu estilo de vida. Nos enorgullecemos de ofrecer una cuidadosa selección de artículos.</p>
        </FooterAccordionCol>
        
        <FooterAccordionCol title="Enlaces de Interés">
          <ul>
            <li><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
            <li><Link href="/trabaja-con-nosotros">Trabaja con nosotros</Link></li>
          </ul>
        </FooterAccordionCol>
        
        <FooterAccordionCol title="Menú Legal">
          <ul>
            <li><Link href="/terminos">Términos de servicio</Link></li>
            <li><Link href="/privacidad">Política de privacidad</Link></li>
            <li><Link href="/garantia">Garantía & Devoluciones</Link></li>
          </ul>
        </FooterAccordionCol>
        
        <FooterAccordionCol title="Suscríbete y Ahorra">
          <SubscribeForm />
        </FooterAccordionCol>
      </div>

      {/* SECCIÓN DE LOGOS DE PAGO INTEGRADA */}
      <div className="footer-bottom-logos-integrated">
        <div className="footer-pagos-grid">
          {logosFooter.map((logo, index) => (
            <div key={index} className="footer-pago-card">
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;