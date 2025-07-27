import Link from 'next/link';
import Image from 'next/image';
// --- CORRECCIÓN: Importamos el tipo desde el archivo central 'lib/types.ts' ---
import { Product } from '@/lib/types';

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={`/products/${product.id}`} className="shop-product-card-link">
    <div className="shop-product-card">
      <div className="image-container">
        {product.oldPrice && <div className="shop-offer-badge">Oferta</div>}
        <Image src={product.imageUrl} alt={product.name} width={300} height={300} className="shop-product-image-primary" />
        {product.imageUrl2 && <Image src={product.imageUrl2} alt={product.name} width={300} height={300} className="shop-product-image-secondary" />}
      </div>
      <h4>{product.name}</h4>
      <div className="price-section">
        <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
        {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
      </div>
    </div>
  </Link>
);

export default ProductCard;