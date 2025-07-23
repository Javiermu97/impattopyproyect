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
      
      {/* Botón de Menú Profesional (Líneas Horizontales) */}
      <button
        className={styles.menuBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menú"
      >
        {/* Estas 3 líneas serán nuestro ícono */}
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};

export default Navbar;
