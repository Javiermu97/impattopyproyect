// app/components/Cart.tsx
'use client';

import Image from 'next/image';
// CORRECCIÓN: Se añade 'app/' a la ruta del contexto.
import { useCart } from '@/app/context/CartContext';
import { Product, ProductVariant } from '@/lib/data';

// Definimos el tipo para un item del carrito
interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export default function Cart() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, openCheckout } = useCart();
  
  const subtotal = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
    0
  );

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>CARRITO ({cartItems.length})</h3>
          <button onClick={closeCart} className="close-btn">&times;</button>
        </div>
        
        {cartItems.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item: CartItem) => (
              <div key={`${item.product.id}-${item.variant.color}`} className="cart-item">
                <Image src={item.variant.image} alt={item.product.name} width={80} height={80} />
                <div className="item-details">
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-variant">{item.variant.color}</p>
                  <p className="item-price">Gs. {(item.product.price * item.quantity).toLocaleString('es-PY')}</p>
                  <div className="item-quantity">
                    <span>Cantidad: {item.quantity}</span>
                    <button onClick={() => removeFromCart(item.product.id, item.variant.color)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total-section">
              <span>TOTAL:</span>
              <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
            </div>
            <p className="footer-note">Los impuestos y gastos de envío se calculan en la pantalla de pagos.</p>
            <button 
              className="checkout-btn" 
              onClick={() => openCheckout(cartItems[0].product, cartItems[0].variant)}
            >
              FINALIZAR PEDIDO
            </button>
          </div>
        )}
      </div>
    </>
  );
}