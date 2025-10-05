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
    <div className="shop-product-card-wrapper">
        <Link href={`/products/${product.id}`} className="shop-product-card-link">
            <div className="shop-product-card">
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
            </div>
        </Link>

        <div className="product-title-container">
            <Link href={`/products/${product.id}`} className="product-title-link">
                <h4>{product.name}</h4>
            </Link>
            <button
                onClick={handleWishlistClick}
                className={`wishlist-icon-btn ${isInWishlist(pid) ? 'active' : ''}`}
                aria-label={isInWishlist(pid) ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
            >
                {isInWishlist(pid) ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
            </button>
        </div>
        
        <Link href={`/products/${product.id}`} className="price-section-link">
            <div className="price-section">
                <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
                {product.oldPrice && (
                    <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>
                )}
            </div>
        </Link>
    </div>
  );
};

export default ProductCard;