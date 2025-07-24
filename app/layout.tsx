// app/layout.tsx
import './globals.css';
import React, { Suspense } from 'react'; // CAMBIO 1: Importamos Suspense
import Link from 'next/link';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SubscribeForm from '@/app/components/SubscribeForm';

export const metadata = {
  title: 'Arcashop PY',
  description: 'Tienda Online - Arcashop PY',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="main-header">
          <Header />
          {/* CAMBIO 2: Envolvemos Navbar en Suspense */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
        </header>

        <main>
          {children}
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col">
              <h3>Sobre Nosotros</h3>
              <p>Bienvenido a nuestra tienda. Nos enorgullecemos de ofrecer una cuidada selección de productos para satisfacer tus necesidades diarias.</p>
            </div>
            <div className="footer-col">
              <h3>Enlaces De Interés</h3>
              <ul>
                <li><Link href="/buscar">Buscar en la tienda</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
                <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
                <li><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Menu Legal</h3>
              <ul>
                <li><Link href="/terminos-servicio">Términos de servicio</Link></li>
                <li><Link href="/politica-privacidad">Política de privacidad</Link></li>
                <li><Link href="/garantia-devoluciones">Garantía y Devoluciones</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Suscribite y Ahorrá</h3>
              <SubscribeForm />
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()}, IMPATTO PY. Todos los derechos reservados | Desarrollado por IMPATTO PY</p>
          </div>
        </footer>
      </body> 
    </html>
  );
}