import { getProductById, getProducts } from '@/lib/database';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient';
import type { Metadata } from 'next';
import { Product } from '@/lib/types';

// La definición del tipo para las props ahora debe reflejar que params es una promesa.
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

// Corregimos la firma de la función y usamos await
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ▼▼▼ CAMBIO 1: Accedemos al ID esperando la promesa de params ▼▼▼
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

// Hacemos lo mismo para el componente de la página
export default async function ProductPage({ params }: Props) {
  // ▼▼▼ CAMBIO 2: Accedemos al ID de la misma forma ▼▼▼
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