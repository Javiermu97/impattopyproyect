// app/components/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';

const ProductCard = ({ product }: { product: Product }) => {
  // Determinar la categoría para pasar en la URL
  // Esto es un ejemplo, podrías tener una lógica más compleja si un producto pertenece a varias categorías
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  const category = keywords.some(key => product.name.includes(key)) ? 'hogar-cocina' : 'mas-vendidos';

  return (
    <Link href={`/products/${product.id}?category=${category}`} className="shop-product-card-link">
      <div className="shop-product-card">
        <div className="image-container">
          {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            width={300} 
            height={300} 
            className="shop-product-image-primary" 
            style={{ objectFit: 'contain' }} 
          />
          <Image 
            src={product.imageUrl2} 
            alt={product.name} 
            width={300} 
            height={300} 
            className="shop-product-image-secondary" 
            style={{ objectFit: 'contain' }} 
          />
        </div>
        <h4>{product.name}</h4>
        <div className="price-section">
          <span className="shop-product-price">
            Gs. {product.price.toLocaleString('es-PY')}
          </span>
          {product.oldPrice && (
            <span className="shop-product-old-price">
              Gs. {product.oldPrice.toLocaleString('es-PY')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;