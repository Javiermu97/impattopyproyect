// app/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.headerLeft}>
        <a href="https://www.facebook.com/tuFacebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/tuInstagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com/tuTwitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </div>

      {/* Agrupamos los elementos centrales en un nuevo div */}
      <div className={styles.headerCenter}>
        <span className={styles.shippingInfo}>Envíos gratis en todos tus pedidos 🚛 📦</span>
        <div className={styles.offersLink}>
          <Link href="/mas-vendidos">Ver ofertas</Link>
        </div>
      </div>
      
      {/* Dejamos un div vacío a la derecha para balancear el layout */}
      <div className={styles.headerRightPlaceholder}></div>
    </div>
  );
};

export default Header;

