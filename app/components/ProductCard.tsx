'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { useState } from 'react';

type Props = { product: Product };

const ProductCard = ({ product }: Props) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();
  const pid = typeof product.id === 'string' ? Number(product.id) : product.id;
  
  const [imageError, setImageError] = useState(false);
  const [secondaryImageError, setSecondaryImageError] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/cuenta/login?redirected=true');
      return;
    }

    toggleWishlist(pid);
  };

  const imageUrl = imageError ? '/placeholder.jpg' : product.imageUrl;
  const sinStock = product.inStock === false;

  return (
    <Link
      href={sinStock ? '#' : `/products/${product.id}`}
      className="shop-product-card-link"
      onClick={sinStock ? (e) => {
        e.preventDefault();
        alert('Este producto no tiene stock disponible por el momento.');
      } : undefined}
    >
      <div className={`shop-product-card ${sinStock ? 'shop-product-card--sin-stock' : ''}`}>
        {/* IMAGEN */}
        <div className="image-container">
          {product.oldPrice && <div className="shop-offer-badge">Oferta</div>}

          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="shop-product-image-primary"
            unoptimized
            onError={() => {
              console.error('Error cargando imagen en ProductCard:', product.imageUrl);
              setImageError(true);
            }}
          />

          {product.imageUrl2 && !secondaryImageError && (
            <Image
              src={product.imageUrl2}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="shop-product-image-secondary"
              unoptimized
              onError={() => setSecondaryImageError(true)}
            />
          )}
        </div>

        {/* TÍTULO + CORAZÓN EN LÍNEA */}
        <div className="shop-title-row">
          <h4 style={{ margin: 0 }}>{product.name}</h4>
          <button
            onClick={handleWishlistClick}
            className={`wishlist-inline-btn ${isInWishlist(pid) ? 'active' : ''}`}
            aria-label={isInWishlist(pid) ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
            title="Lista de deseos"
          >
            {isInWishlist(pid) ? <IoHeart /> : <IoHeartOutline />}
          </button>
        </div>

        {/* PRECIOS */}
        <div className="price-section">
          <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
          {product.oldPrice && (
            <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>
          )}
          {sinStock && (
            <span className="product-sin-stock">Sin stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

