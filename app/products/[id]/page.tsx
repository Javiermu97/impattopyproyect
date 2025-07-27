import { getProductById, getProducts } from '@/lib/database';
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient';
import type { Metadata } from 'next';

/* ────────────────────── 1) RUTAS ESTÁTICAS ────────────────────── */
export async function generateStaticParams() {
  const products = await getProducts();
  if (!Array.isArray(products)) return [];
  return products.map(p => ({ id: p.id.toString() }));
}

/* ────────────────────── 2) ALIAS PageProps ────────────────────── */
export type PageProps = {
  params: { id: string };
};

/* ────────────────────── 3) METADATA DINÁMICA ───────────────────── */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const productId = Number(params.id);
  if (isNaN(productId)) return { title: 'Producto no encontrado' };

  const product = await getProductById(productId);
  if (!product) return { title: 'Producto no encontrado' };

  return {
    title: `${product.name} - Impatto Py`,
    description: product.description.substring(0, 150),
  };
}

/* ────────────────────── 4) PÁGINA DE PRODUCTO ───────────────────── */
export default async function ProductPage({ params }: PageProps) {
  const productId = Number(params.id);
  if (isNaN(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  const relatedProducts = (await getProducts()).filter(p => p.id !== product.id);

  return (
    <ProductDetailPageClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

// La llave de cierre "}" extra que estaba aquí ha sido eliminada.


