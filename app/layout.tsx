import './globals.css';
import React, { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

// Componentes
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import SubscribeForm from '@/app/components/SubscribeForm';
import PageWrapper from '@/app/components/PageWrapper'; // <-- Importamos el nuevo componente

// Contexto
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
            {/* Usamos PageWrapper para envolver a los hijos */}
            <PageWrapper>{children}</PageWrapper>
          </main>
          
          <footer className="footer">
             <div className="footer-content">
                <div className="footer-col">
                  <SubscribeForm />
                </div>
             </div>
             <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Impatto Py. Todos los derechos reservados.</p>
             </div>
          </footer>

          <a href="https://wa.me/595983491155" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
            <FaWhatsapp size={22} />
            Contáctanos
          </a>
        </CartProvider>
      </body> 
    </html>
  );
}