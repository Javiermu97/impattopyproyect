import { getProductById, getProducts } from '@/lib/database';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient';
import type { Metadata } from 'next';
import { Product } from '@/lib/types';

// La definición del tipo para las props ahora refleja que params es una promesa
type Props = {
  params: Promise<{ id: string }>;
};

// Generación de parámetros estáticos
export async function generateStaticParams() {
  const products: Product[] = await getProducts();
  if (!Array.isArray(products)) {
    return [];
  }
  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

// Generación de metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

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

// Componente de página
export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

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
