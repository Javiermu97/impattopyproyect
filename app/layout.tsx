import './globals.css';
import React, { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import PageWrapper from '@/app/components/PageWrapper';
import Footer from '@/app/components/Footer'; // <-- Importa el Footer interactivo
import { CartProvider } from '@/app/context/CartContext';

export const metadata = {
  title: 'Impatto Py| Sentí la diferencia',
  description: 'Tienda Online Impatto Py',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <header className="main-header">
            {/* ... (Header y Navbar) ... */}
          </header>

          <main>
            <PageWrapper>{children}</PageWrapper>
          </main>
          
          <Footer /> {/* <-- Usa el componente Footer aquí */}

          <a href="..." className="whatsapp-button">
            <FaWhatsapp size={22} />
            Contáctanos
          </a>
        </CartProvider>
      </body> 
    </html>
  );
}