'use client'; // ¡Esta es la línea más importante!

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import Cart from '@/app/components/Cart';
import CheckoutForm from '@/app/components/CheckoutForm';
import { Product, ProductVariant } from '@/lib/data';

// Definimos el tipo para la data de la orden
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
  
  // Lógica para el envío de la orden
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