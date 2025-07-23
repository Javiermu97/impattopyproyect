'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para cerrar el menú si se cambia de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { href: '/', label: 'INICIO' },
    { href: '/mas-vendidos', label: 'MÁS VENDIDOS' },
    { href: '/hogar-cocina', label: 'HOGAR & COCINA' },
    { href: '/salud-bienestar', label: 'SALUD & BIENESTAR' },
    { href: '/limpieza', label: 'LIMPIEZA' },
    { href: '/vehiculo', label: 'VEHÍCULO' },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="IMPATTO PY Logo" className={styles.logoImg} />
        </Link>
      </div>

      {/* Navegación que se adaptará */}
      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${currentPath === link.href ? styles.active : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.navIcons}>
        <button className={styles.iconBtn} aria-label="Buscar">🔍</button>
        <button className={styles.iconBtn} aria-label="Perfil">👤</button>
        <button className={styles.iconBtn} aria-label="Carrito">🛒</button>
      </div>
      
      {/* Botón de Menú Profesional (Puntos Verticales) */}
      <button
        className={styles.menuBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menú"
      >
        {/* Ícono SVG para asegurar que sea siempre visible y blanco */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
