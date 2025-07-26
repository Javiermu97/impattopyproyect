'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/app/context/CartContext';
import { IoMenuOutline, IoSearchOutline, IoPersonOutline, IoBagHandleOutline } from 'react-icons/io5';

interface CartItem {
  quantity: number;
}

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const currentPath = usePathname();
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
    <>
      <div className={styles.navbar}>
        {/* Lado Izquierdo: Contiene los enlaces en Desktop y el menú en Móvil */}
        <div className={styles.left}>
          <button className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
            <IoMenuOutline size={28} />
          </button>
          <nav className={styles.navLinks}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Centro: Logo de dos líneas */}
        <div className={styles.logo}>
          <Link href="/">
            IMPATTO <br /> BOUTIQUE
          </Link>
        </div>

        {/* Lado Derecho: Íconos */}
        <div className={styles.right}>
          <button className={styles.iconBtn} aria-label="Buscar">
            <IoSearchOutline size={24} />
          </button>
          <button className={styles.iconBtn} aria-label="Perfil">
            <IoPersonOutline size={24} />
          </button>
          <button className={`${styles.iconBtn} ${styles.cartIconContainer}`} aria-label="Carrito" onClick={openCart}>
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </div>
      
      {/* Menú Desplegable para Móvil (Slide-out) */}
      <nav className={`${styles.mobileNavLinks} ${isMenuOpen ? styles.open : ''}`}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className={styles.mobileNavLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;