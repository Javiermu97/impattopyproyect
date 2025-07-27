'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/app/context/CartContext';
import { IoMenuOutline, IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagHandleOutline } from 'react-icons/io5';

interface CartItem {
  quantity: number;
}

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Obtenemos la ruta actual de la URL
  const currentPath = usePathname();
  
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mas-vendidos', label: 'Más Vendidos' },
    { href: '/hogar', label: 'Hogar' },
    { href: '/bienestar', label: 'Bienestar' },
    { href: '/limpieza', label: 'Limpieza' },
    { href: '/mecanica', label: 'Mecánica & Más' },
  ];

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <button className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
            <IoMenuOutline size={32} />
          </button>
          <button className={`${styles.iconBtn} ${styles.searchIconMobile}`} aria-label="Buscar">
            <IoSearchOutline size={24} />
          </button>
          <nav className={styles.navLinks}>
            {navLinks.map(link => {
              // --- LÓGICA PARA EL SUBRAYADO ACTIVO ---
              // Comparamos la ruta actual con la del enlace
              const isActive = currentPath === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  // Añadimos la clase 'active' si las rutas coinciden
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.logo}>
          <Link href="/">
            IMPATTO <br /> BOUTIQUE
          </Link>
        </div>

        <div className={styles.right}>
          <button className={`${styles.iconBtn} ${styles.searchIconDesktop}`} aria-label="Buscar">
            <IoSearchOutline size={24} />
          </button>
          <button className={styles.iconBtn} aria-label="Perfil">
            <IoPersonOutline size={24} />
          </button>
          <button className={styles.iconBtn} aria-label="Lista de deseos">
            <IoHeartOutline size={24} />
          </button>
          <button className={`${styles.iconBtn} ${styles.cartIconContainer}`} aria-label="Carrito" onClick={openCart}>
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </div>
      
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