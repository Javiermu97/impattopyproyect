// app/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
// CORRECCIÓN: Se añade 'app/' a la ruta del contexto.
import { useCart } from '@/app/context/CartContext';

interface CartItem {
  quantity: number;
}

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath, searchParams]);

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
          const isDirectMatch = currentPath === link.href;
          const isCategoryMatch = currentPath.startsWith('/products/') && activeCategory === link.category;
          const isActive = isDirectMatch || isCategoryMatch;
          return (
            <Link key={link.href} href={link.href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.navIcons}>
        <button className={styles.iconBtn} aria-label="Buscar">🔍</button>
        <button className={styles.iconBtn} aria-label="Perfil">👤</button>
        <button className={`${styles.iconBtn} ${styles.cartIconContainer}`} aria-label="Carrito" onClick={openCart}>
          🛒
          {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
        </button>
      </div>
      
      <button className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};

export default Navbar;