import { getProductById, getProducts } from '@/lib/database';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient';
import type { Metadata } from 'next';
import { Product } from '@/lib/types';
import { transformProduct, transformProducts } from '@/lib/imageUtils';

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

  // Transformar producto para obtener URL completa
  const transformedProduct = transformProduct(product);

  const fullTitle = `${transformedProduct.name} | Impatto Py`;
  const fullDescription = transformedProduct.description?.substring(0, 160) || `Compra ${transformedProduct.name} al mejor precio en Impatto Py. Envíos a todo el país.`;

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
          url: transformedProduct.imageUrl || '/logo.png',
          width: 800,
          height: 800,
          alt: transformedProduct.name,
        },
      ],
      locale: 'es_PY',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [transformedProduct.imageUrl || '/logo.png'],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  // Transformar producto actual
  const transformedProduct = transformProduct(product);

  const allProducts: Product[] = await getProducts();
  // Transformar productos relacionados
  const relatedProducts = transformProducts(
    allProducts.filter((p) => p.id !== product.id)
  );

  return (
    <ProductDetailPageClient
      product={transformedProduct}
      relatedProducts={relatedProducts}
    />
  );
}