'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

// Sub-componente para cada columna que se puede desplegar
const FooterAccordionCol = ({ title, children }: { title: string; children: React.ReactNode }) => {
  // Este 'useState' controla si la sección está abierta o cerrada
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

// Componente principal del Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <FooterAccordionCol title="Sobre Nosotros">
          <p>Bienvenido a nuestra tienda, tu destino para encontrar una amplia gama de productos que se adaptan a tu estilo de vida. Nos enorgullecemos de ofrecer una cuidadosa selección de artículos para satisfacer tus necesidades diarias.</p>
        </FooterAccordionCol>
        
        <FooterAccordionCol title="Enlaces de Interés">
          <ul>
            <li><Link href="/tienda">Buscar en la tienda</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
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
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()}, Impatto PY. Todos los derechos reservados | Desarrollado por Impatto Devs</p>
      </div>
    </footer>
  );
};

export default Footer;