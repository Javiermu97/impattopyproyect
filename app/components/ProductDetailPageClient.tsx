'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import CheckoutForm from '@/app/components/CheckoutForm';
import { Product, ProductVariant, Feature } from '@/lib/types';

// --- INTERFACES ---
interface OrderData {
  orderId: number;
  orderDate: string;
  formData: { email: string; name: string; address: string; city: string; phone?: string; };
  department: string;
  formVariant: ProductVariant;
  product: Product;
  selectedQuantity: number;
  totalPrice: number;
}
interface OrderConfirmationProps {
  orderData: OrderData;
  onGoBack: () => void;
}
type AccordionItemData = {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
};

// --- COMPONENTES AUXILIARES ---
const OrderConfirmation = ({ orderData, onGoBack }: OrderConfirmationProps) => (
  <div className="checkout-modal-overlay">
    <div className="checkout-modal-content confirmation-container">
      <div className="confirmation-header">
        <h2>Pedido #{orderData.orderId}</h2>
        <button onClick={onGoBack} className="back-to-shop-btn"><span>Volver a comprar</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
      <div className="confirmation-main">
        <div className="confirmation-details">
          <div className="confirmation-status"><p className="status-main-text">✓ Confirmado</p><p className="status-date">{orderData.orderDate}</p><p className="status-subtext">Se recibió tu pedido.</p></div>
          <p>Este pedido tiene un pago pendiente. Se actualizará el saldo cuando se reciba el pago.</p>
          <p>Una vez realizado el registro, nos pondremos en contacto con usted vía whatsapp para finalizar su compra!</p>
          <div className="confirmation-contact"><h4>Noticias y ofertas</h4><label className="confirm-checkbox" style={{ fontSize: '0.9rem', fontWeight: 'normal' }}><input type="checkbox" />Enviarme novedades y ofertas por correo electrónico</label></div>
          <div className="info-columns">
            <div className="info-column-left">
              <div><h4>Información de contacto</h4><p>{orderData.formData.email}</p></div>
              <div><h4>Dirección de envío</h4><p>{orderData.formData.name}</p><p>{orderData.formData.address}</p><p>{orderData.formData.city}, {orderData.department}</p><p>Paraguay</p></div>
              <div><h4>Método de envío</h4><p>Envíos Standard (24-72hs)</p></div>
            </div>
            <div className="info-column-right">
              <div><h4>Pago</h4><p>Pago contra entrega</p><p>Gs. {orderData.totalPrice.toLocaleString('es-PY')}</p><p>{orderData.orderDate}</p></div>
              <div><h4>Dirección de facturación</h4><p>{orderData.formData.name}</p><p>{orderData.formData.address}</p><p>{orderData.formData.city}, {orderData.department}</p><p>Paraguay</p></div>
            </div>
          </div>
        </div>
        <div className="confirmation-summary">
          <div className="summary-product"><Image src={orderData.formVariant.image} alt={orderData.product.name} width={80} height={80} /><div className="summary-product-info"><span>{orderData.selectedQuantity} x {orderData.product.name}</span><span>{orderData.formVariant.color}</span></div><span className="summary-product-price">Gs. {orderData.totalPrice.toLocaleString('es-PY')}</span></div>
          <div className="summary-row"><span>Subtotal</span><span>Gs. {orderData.totalPrice.toLocaleString('es-PY')}</span></div>
          <div className="summary-row"><span>Envío</span><span>Gratis</span></div>
          <div className="summary-row total"><span>Total</span><span>PYG {orderData.totalPrice.toLocaleString('es-PY')}</span></div>
        </div>
      </div>
    </div>
  </div>
);
const AccordionItem = ({ item, isOpen, onClick }: { item: AccordionItemData; isOpen: boolean; onClick: () => void; }) => (
  <div className="accordion-item">
    <button className="accordion-header" onClick={onClick}><div className="accordion-title-wrapper"><span className="accordion-title-icon">{item.icon}</span><span>{item.title}</span></div><span className={`accordion-icon ${isOpen ? 'open' : ''}`}>+</span></button>
    <div className={`accordion-content ${isOpen ? 'open' : ''}`}><div className="accordion-content-inner">{item.content}</div></div>
  </div>
);
const RelatedProductCard = ({ product }: { product: Product }) => (
  <Link href={`/products/${product.id}`} className="shop-product-card-link">
    <div className="shop-product-card">
      <div className="image-container">
        {/* La insignia de oferta ahora está DENTRO del contenedor de la imagen */}
        {product.oldPrice && <div className="shop-offer-badge">Oferta</div>}
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          fill 
          sizes="(max-width: 768px) 50vw, 25vw"
          className="shop-product-image-primary" 
        />
        {product.imageUrl2 && <Image src={product.imageUrl2} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="shop-product-image-secondary" />}
      </div>
      {/* AÑADIDO: Mostramos el nombre y precio del producto */}
      <div className="card-info">
        <h4>{product.name}</h4>
        <div className="card-price">
          <span>Gs. {product.price.toLocaleString('es-PY')}</span>
          {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
        </div>
      </div>
    </div>
  </Link>
);
// Reemplaza tu componente actual con este:
const RelatedProductsCarousel = ({ products }: { products: Product[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setTimeout(() => { checkScrollability(); }, 100);
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      }
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    // CAMBIO 1: Añadimos la clase 'arcashop-style' aquí
    <div className="related-products-section arcashop-style">
      {/* CAMBIO 2: Y también al título */}
      <h2 className="related-products-title arcashop-style">Te puede interesar</h2>
      {/* CAMBIO 3: Y al contenedor principal para afectar a las flechas y tarjetas */}
      <div className="carousel-container arcashop-style">
        <button className={`carousel-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`} onClick={() => scroll('left')} disabled={!canScrollLeft} aria-label="Scroll Left"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
        <div className="related-products-grid" ref={scrollContainerRef}>
          {products.map((p: Product) => <RelatedProductCard key={p.id} product={p} />)}
        </div>
        <button className={`carousel-nav-btn next ${!canScrollRight ? 'disabled' : ''}`} onClick={() => scroll('right')} disabled={!canScrollRight} aria-label="Scroll Right"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
      </div>
    </div>
  );
};
const TitleWithStyledTM = ({ name }: { name: string }) => {
  if (!name.includes('™')) return <>{name}</>;
  const parts = name.split('™');
  return <>{parts[0]}<span className="trademark-symbol">™</span>{parts[1]}</>;
};
const StarRating = () => (
    <div className="star-rating">{[...Array(5)].map((_, index) => <svg key={index} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}</div>
);


// --- COMPONENTE PRINCIPAL DE CLIENTE ---
export default function ProductDetailPageClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product.variants ? product.variants[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = product.galleryImages || [];

  useEffect(() => {
    setCurrentImageIndex(0);
    setSelectedVariant(product.variants ? product.variants[0] : null);
  }, [product]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    const imageIndex = galleryImages.findIndex(img => img === variant.image);
    if (imageIndex !== -1) {
      setCurrentImageIndex(imageIndex);
    }
  };

  const handleQuantityChange = (amount: number) => setQuantity(prev => Math.max(1, prev + amount));

  const handleAddToCart = () => {
    const variantToCart = selectedVariant || { color: 'Único', image: product.imageUrl, colorHex: '#FFFFFF' };
    addToCart(product, variantToCart, quantity);
  };
  const handleRealizarPedido = () => {
    setCheckoutVisible(true);
  };
  const handleOrderConfirmation = async (data: OrderData) => {
    try {
      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Error del servidor: ${response.statusText}`);
    } catch (error) {
      console.error('Error al enviar email:', error);
    }
    setOrderData(data);
    setCheckoutVisible(false);
  };

  if (!product) {
    return <div className="pdp-container"><p>Cargando producto...</p></div>;
  }
  if (orderData) {
    return <OrderConfirmation orderData={orderData} onGoBack={() => setOrderData(null)} />;
  }

  const accordionData: AccordionItemData[] = [
    {
      title: 'Información de envío',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
      content: (
        <>
          <p>Nuestro envío es gratuito para cualquiera de los productos en un plazo de 2 a 3 días hábiles, sin embargo contamos con un Envío Urgente en un plazo de entrega en el día o máximo 24hrs que incluye seguro por solo 10.000 Gs.</p>
          <p>Todos los plazos propuestos de entrega de los productos son siempre estimativos pudiendo verificarse demoras en la entrega del producto sin que ello acarree responsabilidad alguna a PAP.</p>
          <p>El usuario será informado de los motivos de esta demora si es que ocurre y así lo requiere.</p>
        </>
      )
    },
    {
      title: 'Cambios y garantía',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
      content: (
        <>
          <p>La garantía del producto es de hasta 5 (cinco) días desde la entrega del mismo. Dentro de ese plazo, el usuario puede contactarse con nosotros al +595 123123123 o al correo contacto@arcashop.py para hacer sus reclamos y/o solicitar la devolución de su compra, según lo dicta la Ley del Comercio Electrónico.</p>
          <p>En el caso de que su pedido haya llegado en malas condiciones, el usuario debe contactarse con nosotros por los mismos medios dentro de los primeros 5 días (Calendario) desde la recepción del producto.</p>
          <p>Nos encargamos de solicitar a PAP el retiro del producto a devolver desde la dirección que nos indique el cliente. El costo de la devolución del producto corre por cuenta del cliente, que debe pagar por el envío a PAP cuando este haga el retiro del mismo.</p>
        </>
      )
    },
    {
      title: 'Preguntas Frecuentes',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
      content: (
        <ul>
          <li><strong>¿Cómo realizo el pago?</strong> Disponemos del pago contra entrega, el cual es el método más seguro para que no arriesgues tu dinero, paga solo cuando recibas tu paquete.</li>
          <li><strong>¿Tienen tienda física?</strong> Somos una tienda 100% online, no tenemos tienda física.</li>
          <li><strong>¿Los productos son nuevos?</strong> Todos nuestros productos son nuevos y originales.</li>
          <li><strong>¿Qué pasa si el producto no funciona?</strong> Aceptamos devoluciones.</li>
        </ul>
      )
    }
  ];

  return (
    <>
      {isCheckoutVisible && selectedVariant && (
        <CheckoutForm
          product={product}
          selectedVariant={selectedVariant}
          onClose={() => setCheckoutVisible(false)}
          onConfirm={handleOrderConfirmation}
        />
      )}
      <div className="pdp-container">
        {/*
          IMPORTANTE: La fila .pdp-header-row ha sido eliminada.
          El título h1 se ha movido dentro de .pdp-info.
        */}
        <div className="pdp-main-layout">
          <div className="pdp-gallery">
            <div className="pdp-main-image-wrapper">
              {galleryImages.length > 0 && (
                <Image 
                  src={galleryImages[currentImageIndex]} 
                  alt={product.name} 
                  className="pdp-main-image" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  priority 
                  style={{ objectFit: 'contain' }}
                />
              )}
              {galleryImages.length > 1 && (
                <>
                  <button onClick={handlePrevImage} className="image-nav-button prev" aria-label="Imagen anterior">
                    &lt;
                  </button>
                  <button onClick={handleNextImage} className="image-nav-button next" aria-label="Siguiente imagen">
                    &gt;
                  </button>
                </>
              )}
            </div>
            <div className="pdp-thumbnails">
              {galleryImages.map((imgSrc, index) => (
                <div 
                  key={index} 
                  className={`pdp-thumbnail ${currentImageIndex === index ? 'active' : ''}`} 
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image src={imgSrc} alt={`Thumbnail ${index + 1}`} width={100} height={100} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="pdp-info">
            {/* TÍTULO MOVIDO AQUÍ PARA UNA ALINEACIÓN PERFECTA */}
            <h1 className="pdp-title"><TitleWithStyledTM name={product.name} />!! SUPER PROMO!!!</h1>

            <StarRating />
            <div className="pdp-price-section">
              <span className="pdp-price">Gs. {product.price.toLocaleString('es-PY')}</span>
              {product.oldPrice && <span className="pdp-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
              {product.oldPrice && <span className="pdp-offer-badge">Oferta</span>}
            </div>
            {selectedVariant && product.variants && (
              <div className="pdp-variants">
                <p className="variant-label">Color: <strong>{selectedVariant.color}</strong></p>
                <div className="variant-swatches">
                  {product.variants.map((variant) => (<button key={variant.color} className={`variant-swatch ${selectedVariant.color === variant.color ? 'selected' : ''}`} style={{ backgroundColor: variant.colorHex }} onClick={() => handleVariantSelect(variant)} title={variant.color} />))}
                </div>
              </div>
            )}
            <div className="pdp-actions-wrapper">
              <div className="add-to-cart-row"><div className="quantity-selector"><button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button><span>{quantity}</span><button onClick={() => handleQuantityChange(1)}>+</button></div><button onClick={handleAddToCart} className="add-to-cart-btn">AGREGAR AL CARRITO</button></div>
              <button className="buy-now-btn" onClick={handleRealizarPedido}><span>REALIZAR MI PEDIDO</span></button>
            </div>
            <div className="pdp-trust-badges-wrapper">
              <div className="trust-badge-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg><span>Envío Gratis</span></div>
              <div className="trust-badge-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span>Pago Seguro</span></div>
              <div className="trust-badge-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Garantía de satisfacción</span></div>
            </div>
            <div className="pdp-guarantee-banner">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="paraguay-flag" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#D52B1E" /><stop offset="33.3%" stopColor="#D52B1E" /><stop offset="33.3%" stopColor="#FFFFFF" /><stop offset="66.6%" stopColor="#FFFFFF" /><stop offset="66.6%" stopColor="#0038A8" /><stop offset="100%" stopColor="#0038A8" /></linearGradient></defs><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#paraguay-flag)" stroke="#cccccc" strokeWidth="0.5" /></svg>
              <span>Productos 100% Paraguayos de calidad garantizada que se acomodan a tus necesidades y gustos.</span>
            </div>
            <div className="info-promo-block">
              <h2 className="promo-title">SÚPER PROMO POR <br /> {product.price.toLocaleString('es-PY')} GS 👑👑👑</h2>
              <h3 className="promo-subtitle">{product.promoSubtitle}</h3>
              <p>{product.description}</p>
              {product.videoUrl ? (
                <video key={product.id} src={product.videoUrl} className="promo-image" autoPlay loop muted playsInline>Tu navegador no soporta el vídeo.</video>
              ) : (
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="promo-image" 
                  width={800} 
                  height={600}
                />
              )}
            </div>
            {product.caracteristicas && product.caracteristicas.map((feature: Feature) => (
              <div key={feature.id} className="info-promo-block-2">
                <h2>{feature.titulo}</h2>
                <p>{feature.descripcion}</p>
                <Image 
                  src={feature.imagen} 
                  alt={feature.titulo} 
                  className="promo-image" 
                  width={800}
                  height={600}
                />
              </div>
            ))}
            <div className="pdp-final-accordion">
              {accordionData.map((item, index) => (<AccordionItem key={index} item={item} isOpen={openAccordion === index} onClick={() => setOpenAccordion(openAccordion === index ? null : index)} />))}
            </div>
          </div>
        </div>
        <RelatedProductsCarousel products={relatedProducts} />
      </div>
    </>
  );
}