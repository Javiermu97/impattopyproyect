import { getProductById, getProducts } from '@/lib/database';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient';
import type { Metadata } from 'next';
import { Product } from '@/lib/types';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const products: Product[] = await getProducts();
  if (!Array.isArray(products)) {
    return [];
  }
  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

// METADATA OPTIMIZADA PARA GOOGLE Y WHATSAPP
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) return { title: 'Producto no encontrado' };

  const product = await getProductById(productId);
  if (!product) return { title: 'Producto no encontrado' };

  const fullTitle = `${product.name} | Impatto Py`;
  const fullDescription = product.description?.substring(0, 160) || `Compra ${product.name} al mejor precio en Impatto Py. Envíos a todo el país.`;

  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: `https://impatto.com.py/product/${id}`,
      siteName: 'Impatto Py Store',
      images: [
        {
          url: product.imageUrl || '/logo.png', // Muestra la foto real del producto al compartir
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      locale: 'es_PY',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [product.imageUrl || '/logo.png'],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  const allProducts: Product[] = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <ProductDetailPageClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
