import { getProductById, getProducts } from '@/lib/database'; // <-- RUTA CORREGIDA
import { notFound } from 'next/navigation';
import ProductDetailPageClient from '@/app/components/ProductDetailPageClient'; 

export default async function ProductPage({ params }: { params: { id: string } }) {
  
  const product = await getProductById(params.id);
  const allProducts = await getProducts();

  if (!product) {
    notFound();
  }

  // Filtramos para obtener solo los productos relacionados
  const relatedProducts = allProducts.filter(p => p.id !== product.id);

  // Pasa los datos al componente visual
  return <ProductDetailPageClient product={product} relatedProducts={relatedProducts} />;
}