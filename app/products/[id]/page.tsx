import { getProductById, getProducts } from '@/lib/database';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient';
import type { Metadata } from 'next';
import { Product } from '@/lib/types';

// Definición de props estándar
type Props = {
  params: { id: string };
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

// La función ahora recibe params como un objeto simple
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = Number(params.id);

  if (isNaN(productId)) {
    return { title: 'Producto no encontrado' };
  }
  const product = await getProductById(productId);
  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  return {
    title: `${product.name} - Impatto Py`,
    description: product.description.substring(0, 150),
  };
}

// El componente de la página también recibe params como un objeto simple
export default async function ProductPage({ params }: Props) {
  const productId = Number(params.id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }

  const allProducts: Product[] = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <ProductDetailPageClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}