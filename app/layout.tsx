export const dynamic = 'force-dynamic'
import './globals.css';
import React, { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import PageWrapper from '@/app/components/PageWrapper';
import Footer from '@/app/components/Footer';
import Copyright from '@/app/components/Copyright';
import { CartProvider } from '@/app/context/CartContext';
import { AuthProvider } from '@/app/context/AuthContext';
import { WishlistProvider } from '@/app/context/WishlistContext';
import AnalyticsTracker from '@/app/components/AnalyticsTracker';

export const metadata = {
  metadataBase: new URL('https://impatto.com.py'),
  title: 'Impatto Py | Sentí la diferencia',
  description: 'Tu tienda online de confianza en Paraguay. Productos para el hogar, salud y bienestar con envíos a todo el país.',
  keywords: ['Impatto Py', 'Tienda Online Paraguay', 'Hogar y Cocina', 'Compras Asunción'],
  icons: { icon: '/logo.png' },
  // Verificación de Google Search Console
  verification: {
    google: 'google-site-verification: googlea6213aca70b7fbe0.html', 
  },
  // Esto es lo que hace que se vea bien en WhatsApp y Facebook
  openGraph: {
    title: 'Impatto Py | Sentí la diferencia',
    description: 'Calidad y confianza en cada pedido. Envíos a todo Paraguay.',
    url: 'https://impatto.com.py',
    siteName: 'Impatto Py',
    images: [{ url: '/logo.png', width: 800, height: 600 }],
    locale: 'es_PY',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <AnalyticsTracker />
              <header className="main-header">
                <Header />
                <Suspense fallback={null}>
                  <Navbar />
                </Suspense>
              </header>

              <main>
                <PageWrapper>{children}</PageWrapper>
              </main>

              <Footer />
              <Copyright />

              <a
                href="https://wa.me/595983491155"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                <FaWhatsapp size={22} />
                Contáctanos
              </a>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}