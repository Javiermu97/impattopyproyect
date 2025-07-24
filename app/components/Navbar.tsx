// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'; // CAMBIO 1: Importamos useSearchParams
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams(); // CAMBIO 2: Usamos el hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Obtenemos la categoría de la URL. Ej: 'mas-vendidos'
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath, searchParams]); // Se cierra también si cambian los parámetros

  // CAMBIO 3: Añadimos un identificador de categoría a cada enlace
  const navLinks = [
    { href: '/', label: 'INICIO', category: 'inicio' },
    { href: '/mas-vendidos', label: 'MÁS VENDIDOS', category: 'mas-vendidos' },
    { href: '/hogar-cocina', label: 'HOGAR & COCINA', category: 'hogar-cocina' },
    { href: '/salud-bienestar', label: 'SALUD & BIENESTAR', category: 'salud-bienestar' },
    { href: '/limpieza', label: 'LIMPIEZA', category: 'limpieza' },
    { href: '/vehiculo', label: 'VEHÍCULO', category: 'vehiculo' },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="IMPATTO PY Logo" className={styles.logoImg} />
        </Link>
      </div>

      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        {navLinks.map(link => {
          // CAMBIO 4: Nueva lógica para determinar si el enlace está activo
          const isDirectMatch = currentPath === link.href;
          const isCategoryMatch = currentPath.startsWith('/products/') && activeCategory === link.category;
          const isActive = isDirectMatch || isCategoryMatch;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.navIcons}>
        <button className={styles.iconBtn} aria-label="Buscar">🔍</button>
        <button className={styles.iconBtn} aria-label="Perfil">👤</button>
        <button className={styles.iconBtn} aria-label="Carrito">🛒</button>
      </div>
      
      <button
        className={styles.menuBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menú"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};

export default Navbar;