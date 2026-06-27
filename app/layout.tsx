export const dynamic = 'force-dynamic'

import './globals.css'
import React, { Suspense } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Header from '@/app/components/Header'
import Navbar from '@/app/components/Navbar'
import PageWrapper from '@/app/components/PageWrapper'
import Footer from '@/app/components/Footer'
import Copyright from '@/app/components/Copyright'
import { CartProvider } from '@/app/context/CartContext'
import { AuthProvider } from '@/app/context/AuthContext'
import { WishlistProvider } from '@/app/context/WishlistContext'
import AnalyticsTracker from '@/app/components/AnalyticsTracker'
import TidioChat from '@/app/components/TidioChat' // Única adición de importación

export const metadata = {
  metadataBase: new URL('https://impatto.com.py'),
  title: 'Impatto Py | Sentí la diferencia',
  description: 'Tu tienda online de confianza en Paraguay. Productos para el hogar, salud y bienestar con envíos a todo el país.',
  keywords: ['Impatto Py', 'Tienda Online Paraguay', 'Hogar y Cocina', 'Compras Asunción'],
  icons: { icon: '/logo.png' },
  verification: {
    google: 'V3SWLCYX76L7yvjDHyf186S4dE2YNoMjnXyZ02VtF2w',
  },
  other: {
    'fb:app_id': '513118241881176',
  },
  openGraph: {
    title: 'Impatto Py | Sentí la diferencia',
    description: 'Calidad y confianza en cada pedido. Envíos a todo Paraguay.',
    url: 'https://impatto.com.py',
    siteName: 'Impatto Py',
    images: [
      {
        url: 'https://impatto.com.py/logo-og.jpg', 
        width: 1200, // Medida estándar para que se vea grande
        height: 630,
        alt: 'Logo Impatto Py',
      },
    ],
    locale: 'es_PY',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
  {/* Pixel de Meta */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2155381742025389');
        fbq('track', 'PageView');
      `,
    }}
  />
  <noscript>
    <img
      height="1"
      width="1"
      style={{ display: 'none' }}
      src="https://www.facebook.com/tr?id=1175842827695566&ev=PageView&noscript=1"
    />
  </noscript>
</head>
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

              {/* Única adición del componente de Chat */}
              <TidioChat />

            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
