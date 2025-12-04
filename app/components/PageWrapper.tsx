'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import Cart from '@/app/components/Cart';
import CheckoutForm from '@/app/components/CheckoutForm';
import { Product, ProductVariant } from '@/lib/types';

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

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { isCheckoutOpen, closeCheckout, selectedProductInfo } = useCart();
  
  const handleConfirmOrder = async (orderData: OrderPayload) => {
      // 1. Cerramos el formulario visualmente
      closeCheckout();

      // 2. Preparamos el mensaje para TU número (0983491155)
      // El formato debe ser 595 + el número sin el 0
      const telefonoImpatto = '595983491155'; 
      
      const mensaje = `Hola Impatto, realicé el pedido #${orderData.orderId} de ${orderData.product.name}. Quiero confirmar mi compra.`;
      
      // Construimos el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${telefonoImpatto}?text=${encodeURIComponent(mensaje)}`;

      // 3. Mostramos una alerta y abrimos WhatsApp automáticamente
      setTimeout(() => {
          if (confirm('¡Pedido registrado correctamente! 🎉\n\nPresiona ACEPTAR para finalizar tu compra enviándonos un mensaje por WhatsApp.')) {
              window.open(whatsappUrl, '_blank');
          }
      }, 500);
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