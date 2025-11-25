'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';

type Props = { product: Product };

const ProductCard = ({ product }: Props) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();
  const pid = typeof product.id === 'string' ? Number(product.id) : product.id;

  const handleWishlistClick = (e: React.MouseEvent) => {
    // Evitar navegación del Link padre y que el evento burbujee
    e.preventDefault();
    e.stopPropagation();

    // Si no hay usuario, redirigir al login (misma ruta que usás en ShopPageClient)
    if (!user) {
      router.push('/cuenta/login?redirected=true');
      return;
    }

    // Si está logueado, alternar wishlist
    toggleWishlist(pid);
  };

  return (
    <Link href={`/products/${product.id}`} className="shop-product-card-link">
      <div className="shop-product-card">
        {/* IMAGEN */}
        <div className="image-container">
          {product.oldPrice && <div className="shop-offer-badge">Oferta</div>}

          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="shop-product-image-primary"
          />

          {product.imageUrl2 && (
            <Image
              src={product.imageUrl2}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="shop-product-image-secondary"
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
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

