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
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoArrowBackOutline,
  IoCallOutline,
  IoMailOutline
} from 'react-icons/io5';

const Navbar = () => {
  const { openCart, cartItems } = useCart();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const currentPath = usePathname();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [currentPath]);

  // MENÚ PRINCIPAL
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mas-vendidos', label: 'Más Vendidos' },
    {
      href: '#', // Cambiado a '#' porque Hogar & Cocina no debe dirigir a una página
      label: 'Hogar & Cocina',
      submenu: [
        { href: '/limpieza', label: 'Limpieza' },
  { href: '/cocina', label: 'Cocina' },
  { href: '/electrodomesticos', label: 'Electrodomésticos' },
  { href: '/organizacion', label: 'Hogar' }, // Cambio: Organización -> Hogar
  { href: '/bano', label: 'Baño' },
  { href: '/hogar-inteligente', label: 'Iluminación' }, // Cambio: Hogar Inteligente -> Iluminación
]
    },
    { href: '/bienestar', label: 'Salud & Bienestar' },
    { href: '/mecanica', label: 'Mecánica & Más' },
  ];

  const activeSubmenuData = navLinks.find(link => link.label === activeSubmenu);

  return (
    <>
      <header className={styles.navbar}>
        
        {/* IZQUIERDA */}
        <div className={styles.left}>
          <button className={styles.menuBtn} onClick={() => setIsMenuOpen(true)}>
            <IoMenuOutline size={26} />
          </button>

          <button className={styles.searchIconMobile} onClick={() => setIsSearchOpen(true)}>
            <IoSearchOutline size={22} />
          </button>

          {/* MENÚ ESCRITORIO */}
          <nav className={styles.navLinks}>
            {navLinks.map((link) => (
              <div
                key={link.label}
                className={styles.navItemWrapper}
                onMouseEnter={() => link.submenu && setOpenDropdown(link.label)}
                onMouseLeave={() => link.submenu && setOpenDropdown(null)}
              >
                {/* Lógica condicional: Si tiene submenú, renderiza un span (texto plano), si no, un Link */}
                {link.submenu ? (
                  <span className={`${styles.navLink} ${styles.noLink}`}>
                    {link.label}
                    <IoChevronDownOutline
                      size={10}
                      style={{ marginLeft: '4px', opacity: 0.6 }}
                    />
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${
                      currentPath === link.href ? styles.active : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* SUBMENÚ ESCRITORIO (Dropdown) */}
                {link.submenu && (
                  <div
                    className={`${styles.dropdownMenu} ${
                      openDropdown === link.label ? styles.open : ''
                    }`}
                  >
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={styles.dropdownLink}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* CENTRO: LOGO */}
        <div className={styles.logo}>
          <Link href="/">IMPATTO</Link>
        </div>

        {/* DERECHA */}
        <div className={styles.right}>
          <button className={`${styles.iconBtn} ${styles.searchIconDesktop}`} onClick={() => setIsSearchOpen(true)}>
            <IoSearchOutline size={22} />
          </button>

          <Link href={user ? '/cuenta' : '/cuenta/login'} className={styles.iconBtn}>
            <IoPersonOutline size={22} />
          </Link>

          <Link href={user ? '/wishlist' : '/cuenta/login'} className={styles.iconBtn}>
            <IoHeartOutline size={22} />
          </Link>

          <button className={`${styles.iconBtn} ${styles.cartIconContainer}`} onClick={openCart}>
            <IoBagHandleOutline size={22} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* OVERLAY MÓVIL */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={() => {
          setIsMenuOpen(false);
          setActiveSubmenu(null);
        }}
      />

      {/* MENÚ MÓVIL */}
      <nav className={`${styles.mobileDrawer} ${isMenuOpen ? styles.open : ''}`}>
        
        <div className={styles.drawerHeader}>
          {activeSubmenu ? (
            <button className={styles.backBtn} onClick={() => setActiveSubmenu(null)}>
              <IoArrowBackOutline size={24} />
              <span className={styles.headerTitle}>{activeSubmenu}</span>
            </button>
          ) : (
            <span className={styles.headerTitleMain}>MENÚ</span>
          )}
          
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <IoCloseOutline size={28} />
          </button>
        </div>

        <div className={styles.drawerList}>
          {activeSubmenu && activeSubmenuData ? (
            <div className={styles.submenuContainer}>
              {activeSubmenuData.submenu?.map(subItem => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={styles.drawerLinkSub}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          ) : (
            navLinks.map((link) => (
              <div key={link.label} className={styles.drawerItemRow}>
                {link.submenu ? (
                  <button
                    className={styles.drawerBtnTrigger}
                    onClick={() => setActiveSubmenu(link.label)}
                  >
                    {link.label}
                    <IoChevronForwardOutline size={18} color="#999" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={styles.drawerLinkMain}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))
          )}
        </div>

        <div className={styles.drawerFooter}>
          <Link
            href={user ? '/cuenta' : '/cuenta/login'}
            className={styles.drawerAuthLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <IoPersonOutline size={18} />
            <span>{user ? 'Mi Cuenta' : 'Iniciar Sesión'}</span>
          </Link>

          <div className={styles.contactInfo}>
            <IoCallOutline /> 0983 491 155
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
