'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import Cart from '@/app/components/Cart';
import CheckoutForm from '@/app/components/CheckoutForm';
// --- CORRECCIÓN: Importamos los tipos desde el archivo central 'lib/types.ts' ---
import { Product, ProductVariant } from '@/lib/types';

// Esta interfaz ahora usa los tipos 'Product' y 'ProductVariant' correctos
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