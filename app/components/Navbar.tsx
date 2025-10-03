'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORTA EL HOOK
import { IoMenuOutline, IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagHandleOutline } from 'react-icons/io5';

interface CartItem {
  quantity: number;
}

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  const { user } = useAuth(); // <-- 2. OBTIENE EL USUARIO DEL CONTEXTO
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
          {/* ... (código del menú y búsqueda móvil sin cambios) ... */}
          <nav className={styles.navLinks}>
            {/* ... (código de los links de navegación sin cambios) ... */}
          </nav>
        </div>

        <div className={styles.logo}>
          {/* ... (código del logo sin cambios) ... */}
        </div>

        <div className={styles.right}>
          <button className={`${styles.iconBtn} ${styles.searchIconDesktop}`} aria-label="Buscar">
            <IoSearchOutline size={24} />
          </button>
          
          {/* --- 3. CAMBIO: El botón de Perfil ahora es un Link condicional --- */}
          <Link href={user ? '/cuenta' : '/cuenta/login'} className={styles.iconBtn} aria-label="Perfil">
            <IoPersonOutline size={24} />
          </Link>
          
          {/* --- 4. CAMBIO: El botón de Lista de Deseos ahora es un Link condicional --- */}
          <Link 
            href={user ? '/cuenta/lista-de-deseos' : '/cuenta/login?redirected=true'} 
            className={styles.iconBtn} 
            aria-label="Lista de deseos"
          >
            <IoHeartOutline size={24} />
          </Link>
          
          <button className={`${styles.iconBtn} ${styles.cartIconContainer}`} aria-label="Carrito" onClick={openCart}>
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </div>
      
      <nav className={`${styles.mobileNavLinks} ${isMenuOpen ? styles.open : ''}`}>
        {/* ... (código de los links móviles sin cambios) ... */}
      </nav>
    </>
  );
};

export default Navbar;