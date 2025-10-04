import Link from 'next/link';
import Image from 'next/image';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useWishlist } from '@/app/context/WishlistContext';
import { Product } from '@/lib/types';

const ProductCard = ({ product }: { product: Product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const pid = typeof product.id === 'string' ? Number(product.id) : product.id;

  return (
    <Link href={`/products/${product.id}`} className="shop-product-card-link">
      <div className="shop-product-card">
        <div className="image-container">
          {product.oldPrice && <div className="shop-offer-badge">Oferta</div>}

          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="shop-product-image-primary"
          />
          {product.imageUrl2 && (
            <Image
              src={product.imageUrl2}
              alt={product.name}
              width={300}
              height={300}
              className="shop-product-image-secondary"
            />
          )}

          {/* Corazón con fondo gris, esquina inferior derecha */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(pid);
            }}
            className={`wishlist-icon-btn ${isInWishlist(pid) ? 'active' : ''}`}
            aria-label={isInWishlist(pid) ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
            title="Lista de deseos"
            style={{ position: 'absolute', right: 10, bottom: 10, zIndex: 9999 }}
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
