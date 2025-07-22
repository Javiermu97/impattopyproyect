'use client'; // Necesario para usar el hook usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Importa el hook para leer la URL
import styles from './Navbar.module.css';

const Navbar = () => {
  const currentPath = usePathname(); // 2. Obtiene la ruta actual, ej: "/mas-vendidos"

  // Lista de enlaces para gestionarlos más fácilmente
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
          <img src="/logo.png" alt="Arcashop PY Logo" style={{ height: '40px', display: 'block' }} />
        </Link>
      </div>
      <nav className={styles.navLinks}>
        {/* 3. Mapea los enlaces y aplica la clase 'active' si la ruta coincide */}
        {navLinks.map(link => {
          const isActive = currentPath === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              // Aplica la clase base 'navLink' siempre, y la clase 'active' solo si el enlace está activo
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className={styles.navIcons}>
        <button className={styles.iconBtn}>🔍</button>
        <button className={styles.iconBtn}>👤</button>
        <button className={styles.iconBtn}>🛒</button>
      </div>
    </div>
  );
};

export default Navbar;
