'use client'; // Necesario para usar el hook usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const currentPath = usePathname();

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

      <nav className={styles.navLinks}>
        {navLinks.map(link => {
          const isActive = currentPath === link.href;
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
    </div>
  );
};

export default Navbar;
