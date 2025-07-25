'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

// Sub-componente para las columnas que serán desplegables en móvil
const FooterAccordionCol = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="footer-col footer-col-accordion">
      <h3 onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>+</span>
      </h3>
      <ul className={`footer-links ${isOpen ? 'open' : ''}`}>
        {links.map(link => (
          <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
        ))}
      </ul>
    </div>
  );
};

// Componente principal del Footer
const Footer = () => {
  const enlacesDeInteres = [
    { href: "/tienda", label: "Buscar en la tienda" },
    { href: "/contacto", label: "Contacto" },
    { href: "/sobre-nosotros", label: "Sobre nosotros" },
    { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
    { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
  ];

  const menuLegal = [
    { href: "/terminos", label: "Términos de servicio" },
    { href: "/privacidad", label: "Política de privacidad" },
    { href: "/garantia", label: "Garantía & Devoluciones" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Columna "Sobre Nosotros" - No necesita ser acordeón */}
        <div className="footer-col">
          <h3>Sobre Nosotros</h3>
          <p>Bienvenido a nuestra tienda, tu destino para encontrar una amplia gama de productos que se adaptan a tu estilo de vida. Nos enorgullecemos de ofrecer una cuidadosa selección de artículos para satisfacer tus necesidades diarias.</p>
        </div>

        {/* Columnas con Acordeón */}
        <FooterAccordionCol title="Enlaces de Interés" links={enlacesDeInteres} />
        <FooterAccordionCol title="Menú Legal" links={menuLegal} />

        {/* Columna de Suscripción */}
        <div className="footer-col">
          <SubscribeForm />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()}, Arca Shop PY. Todos los derechos reservados | Desarrollado por Blueprint Digital</p>
      </div>
    </footer>
  );
};

export default Footer;