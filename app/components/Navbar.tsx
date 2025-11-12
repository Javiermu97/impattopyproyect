'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal'; // <-- 1. IMPORTACIÓN AÑADIDA
import {
  IoMenuOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagHandleOutline,
} from 'react-icons/io5';

interface CartItem {
  quantity: number;
}

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <-- 2. ESTADO AÑADIDO

  const currentPath = usePathname();

  const totalItems = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  useEffect(() => {
    // al cambiar de ruta, cierra el menú móvil
    setIsMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/tienda', label: 'Más Vendidos' },
    { href: '/hogar', label: 'Hogar' },
    { href: '/bienestar', label: 'Bienestar' },
    { href: '/limpieza', label: 'Limpieza' },
    { href: '/mecanica', label: 'Mecánica & Más' },
  ];

  return (
    <>
      <div className={styles.navbar}>
        {/* IZQUIERDA: botón menú + links escritorio */}
        <div className={styles.left}>
          <button
            className={styles.menuBtn}
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <IoMenuOutline size={24} />
          </button>

          <nav className={styles.navLinks}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.navLink} ${
                  currentPath === l.href ? styles.active : ''
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTRO: logo */}
        <div className={styles.logo}>
          <Link href="/">IMPATTO</Link>
        </div>

        {/* DERECHA: acciones */}
        <div className={styles.right}>
          {/* búsqueda (icono) */}
          <button
            className={`${styles.iconBtn} ${styles.searchIconDesktop}`}
            aria-label="Buscar"
            onClick={() => setIsSearchOpen(true)} // <-- 3. onClick AÑADIDO
          >
            <IoSearchOutline size={24} />
          </button>

          {/* PERFIL: si hay sesión -> /cuenta; si no -> /cuenta/login */}
          <Link
            href={user ? '/cuenta' : '/cuenta/login'}
            className={styles.iconBtn}
            aria-label="Perfil"
            title={user ? 'Mi cuenta' : 'Iniciar sesión'}
          >
            <IoPersonOutline size={24} />
          </Link>

          {/* LISTA DE DESEOS (CORAZÓN) */}
          <Link
            href={user ? '/wishlist' : '/cuenta/login?redirected=true'}
            className={styles.iconBtn}
            aria-label="Lista de deseos"
            title="Lista de deseos"
          >
            <IoHeartOutline size={24} />
          </Link>

          {/* CARRITO */}
          <button
            className={`${styles.iconBtn} ${styles.cartIconContainer}`}
            aria-label="Carrito"
            onClick={openCart}
          >
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <nav
        className={`${styles.mobileNavLinks} ${
          isMenuOpen ? styles.open : ''
        }`}
      >
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
      </nav>

      {/* 4. MODAL DE BÚSQUEDA AÑADIDO AL FINAL */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
