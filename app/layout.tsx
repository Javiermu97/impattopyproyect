// app/layout.tsx
import './globals.css';
import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SubscribeForm from '@/app/components/SubscribeForm'; // <-- PASO 1: IMPORTA EL COMPONENTE AQUÍ

export const metadata = {
  title: 'Impatto|Sentí la diferencia',
  description: 'Tienda Online - Arcashop PY',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="main-header">
          <Header />
          <Navbar />
        </header>

        <main>
          {children}
        </main>
        
        {/* --- CÓDIGO DEL FOOTER --- */}
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
              
              {/* PASO 2: REEMPLAZA EL FORMULARIO ANTIGUO CON EL COMPONENTE */}
              <SubscribeForm />

            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()}, IMPATTO PY. Todos los derechos reservados | Desarrollado por IMPATTO  PY</p>
          </div>
        </footer>
      </body> 
    </html>
  );
}