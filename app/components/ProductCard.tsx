import Link from 'next/link';
import Image from 'next/image';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';

const ProductCard = ({ product }: { product: Product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();
  const pid = typeof product.id === 'string' ? Number(product.id) : product.id;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push('/cuenta/login?redirected=true');
      return;
    }
    toggleWishlist(pid);
  };

  return (
    <Link href={`/products/${product.id}`} className="shop-product-card-link">
      <div className="shop-product-card">
        <div className="image-container">
          {product.oldPrice && <div className="shop-offer-badge">Oferta</div>}

          {/* Imagen Principal */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="shop-product-image-primary"
          />
          
          {/* Imagen Secundaria (para el hover) */}
          {product.imageUrl2 && (
            <Image
              src={product.imageUrl2}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="shop-product-image-secondary"
            />
          )}

          {/* Botón de Wishlist */}
          <button
            onClick={handleWishlistClick}
            className={`wishlist-icon-btn ${isInWishlist(pid) ? 'active' : ''}`}
            aria-label={isInWishlist(pid) ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
            title="Lista de deseos"
          >
            {isInWishlist(pid) ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
          </button>
        </div>

        <h4>{product.name}</h4>
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