'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
// CORRECCIÓN: La ruta ahora es correcta, apuntando a la carpeta 'lib' en la raíz.
import { Product, ProductVariant } from '@/lib/data';

// Interfaz para un item dentro del carrito
interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

// Interfaz para el valor que proveerá el contexto
interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  selectedProductInfo: { product: Product; variant: ProductVariant } | null;
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (productId: number, variantColor: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: (product: Product, variant: ProductVariant) => void;
  closeCheckout: () => void;
}

// Creamos el contexto con un valor inicial de 'undefined'
const CartContext = createContext<CartContextType | undefined>(undefined);

// Creamos el componente Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProductInfo, setSelectedProductInfo] = useState<{ product: Product; variant: ProductVariant } | null>(null);

  // Función para añadir productos al carrito
  const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setCartItems(prevItems => {
      // Revisa si el producto con la misma variante ya existe en el carrito
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.variant.color === variant.color
      );

      if (existingItemIndex > -1) {
        // Si existe, actualiza la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Si no existe, lo añade como un nuevo item
        return [...prevItems, { product, variant, quantity }];
      }
    });
    setCartOpen(true); // Abre el panel del carrito automáticamente
  };

  // Función para remover un item del carrito
  const removeFromCart = (productId: number, variantColor: string) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.product.id === productId && item.variant.color === variantColor)
      )
    );
  };

  // Funciones para controlar la visibilidad del carrito y checkout
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const openCheckout = (product: Product, variant: ProductVariant) => {
    setSelectedProductInfo({ product, variant });
    setCheckoutOpen(true);
    closeCart(); // Cierra el carrito cuando se abre el checkout
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setSelectedProductInfo(null);
  };

  // El valor que será accesible por los componentes hijos
  const value = {
    cartItems,
    isCartOpen,
    isCheckoutOpen,
    selectedProductInfo,
    addToCart,
    removeFromCart,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};