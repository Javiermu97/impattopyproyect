import './globals.css';
import React, { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import PageWrapper from '@/app/components/PageWrapper';
import Footer from '@/app/components/Footer'; // <-- Importa el Footer desde su archivo
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
            <Header />
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
          </header>

          <main>
            <PageWrapper>{children}</PageWrapper>
          </main>
          
          {/* Aquí se inserta todo el contenido del footer desde su componente */}
          <Footer />

          <a href="https://wa.me/595983491155" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
            <FaWhatsapp size={22} />
            Contáctanos
          </a>
        </CartProvider>
      </body> 
    </html>
  );
}