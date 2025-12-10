'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';
import {
  IoMenuOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagHandleOutline,
  IoCloseOutline,
  IoCallOutline,
  IoMailOutline
} from 'react-icons/io5';

interface CartItem {
  quantity: number;
}

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currentPath = usePathname();

  const totalItems = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { href: '/', label: 'INICIO' },
    { href: '/tienda', label: 'MÁS VENDIDOS' },
    { href: '/hogar', label: 'HOGAR & COCINA' },
    { href: '/bienestar', label: 'SALUD & BIENESTAR' },
    { href: '/limpieza', label: 'LIMPIEZA' },
    { href: '/vehiculo', label: 'VEHICULO' },
  ];

  return (
    <>
      <div className={styles.navbar}>
        
        {/* === IZQUIERDA == */}
        <div className={styles.left}>
          {/* 1. Botón Hamburguesa (Solo Móvil) */}
          <button
            className={styles.menuBtn}
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen(true)}
          >
            <IoMenuOutline size={28} /> {/* Hice el icono un poco más grande */}
          </button>

          {/* 2. Botón Búsqueda (Solo Móvil - Al lado de la hamburguesa) */}
          <button
            className={styles.searchIconMobile}
            aria-label="Buscar"
            onClick={() => setIsSearchOpen(true)}
          >
            <IoSearchOutline size={24} />
          </button>

          {/* 3. Links de navegación (Solo Escritorio) */}
          <nav className={styles.navLinks}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.navLink} ${
                  currentPath === l.href ? styles.active : ''
                }`}
              >
                {l.label.replace(' 🔥', '')}
              </Link>
            ))}
          </nav>
        </div>

        {/* === CENTRO: Logo === */}
        <div className={styles.logo}>
          <Link href="/">IMPATTO</Link>
        </div>

        {/* === DERECHA === */}
        <div className={styles.right}>
          {/* Búsqueda (Solo Escritorio) */}
          <button
            className={`${styles.iconBtn} ${styles.searchIconDesktop}`}
            onClick={() => setIsSearchOpen(true)}
          >
            <IoSearchOutline size={24} />
          </button>

          {/* Perfil */}
          <Link href={user ? '/cuenta' : '/cuenta/login'} className={styles.iconBtn}>
            <IoPersonOutline size={24} />
          </Link>

          {/* Wishlist */}
          <Link href={user ? '/wishlist' : '/cuenta/login'} className={styles.iconBtn}>
            <IoHeartOutline size={24} />
          </Link>

          {/* Carrito */}
          <button className={`${styles.iconBtn} ${styles.cartIconContainer}`} onClick={openCart}>
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </div>

      {/* === MENÚ MÓVIL LATERAL === */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`} 
        onClick={() => setIsMenuOpen(false)}
      />

      <nav className={`${styles.mobileNavLinks} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menuHeader}>
          {/* X de Cerrar (Color Negro forzado en CSS) */}
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.menuList}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className={styles.menuFooter}>
          <a href="tel:0983491155" className={styles.contactItem}>
            <IoCallOutline size={18} />
            <span>0983 491 155</span>
          </a>
          <a href="mailto:administracion@impatto.com.py" className={styles.contactItem}>
            <IoMailOutline size={18} />
            <span>administracion@impatto.com.py</span>
          </a>
          <Link 
            href={user ? '/cuenta' : '/cuenta/login'} 
            className={styles.authLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <IoPersonOutline size={18} />
            <span>{user ? 'Mi Cuenta' : 'Registrarse / Crear cuenta'}</span>
          </Link>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;