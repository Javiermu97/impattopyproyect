import './globals.css';
import React, { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import SubscribeForm from '@/app/components/SubscribeForm';
import PageWrapper from '@/app/components/PageWrapper';
// import InfoBanner from '@/app/components/InfoBanner'; // <-- LÍNEA ELIMINADA
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
          
          {/* <InfoBanner />  <-- COMPONENTE ELIMINADO DE AQUÍ */}

          <footer className="footer">
            <div className="footer-content">
              <div className="footer-col">
                <h3>Sobre Nosotros</h3>
                <p>Bienvenido a nuestra tienda...</p>
              </div>
              <div className="footer-col">
                <h3>Enlaces de Interés</h3>
                <ul>
                  <li><a href="#">Buscar en la tienda</a></li>
                  {/* ... otros enlaces ... */}
                </ul>
              </div>
              <div className="footer-col">
                <h3>Menú Legal</h3>
                <ul>
                  <li><a href="#">Términos de servicio</a></li>
                   {/* ... otros enlaces ... */}
                </ul>
              </div>
              <div className="footer-col">
                <SubscribeForm />
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()}, Arca Shop PY. Todos los derechos reservados | Desarrollado por Blueprint Digital</p>
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