// app/layout.tsx
import './globals.css';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { Product, ProductVariant } from '@/lib/data';

// Componentes con rutas corregidas
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
// CORRECCIÓN: Se añade 'app/' a la ruta del componente.
import SubscribeForm from '@/app/components/SubscribeForm';
import Cart from '@/app/components/Cart';
import CheckoutForm from '@/app/components/CheckoutForm';

// Contexto con ruta corregida
import { CartProvider, useCart } from '@/app/context/CartContext';

export const metadata = {
  title: 'Impatto Py| Sentí la diferencia',
  description: 'Tienda Online Impatto Py',
  icons: {
    icon: '/logo.png',
  },
};

interface OrderPayload {
  orderId: number;
  orderDate: string;
  formData: {
    email: string;
    name: string;
    address: string;
    city: string;
    phone?: string;
  };
  department: string;
  formVariant: ProductVariant;
  product: Product;
  selectedQuantity: number;
  totalPrice: number;
}

function PageContent({ children }: { children: React.ReactNode }) {
  const { isCheckoutOpen, closeCheckout, selectedProductInfo } = useCart();
  
  const handleConfirmOrder = async (orderData: OrderPayload) => {
    try {
      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        alert('¡Pedido realizado con éxito! Revisa tu correo.');
        closeCheckout();
      } else {
        alert('Hubo un error al realizar el pedido.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un error de conexión al realizar el pedido.');
    }
  };

  return (
    <>
      {children}
      <Cart />
      {isCheckoutOpen && selectedProductInfo && (
        <CheckoutForm
          product={selectedProductInfo.product}
          selectedVariant={selectedProductInfo.variant}
          onClose={closeCheckout}
          onConfirm={handleConfirmOrder}
        />
      )}
    </>
  );
}

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
            <PageContent>{children}</PageContent>
          </main>
          
          <footer className="footer">
             <div className="footer-content">
                {/* Aquí puedes poner otras columnas de información si las tienes */}
                <div className="footer-col">
                  {/* Al añadir el componente aquí, la importación se activará */}
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