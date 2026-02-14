import { supabase } from './supabaseClient';

export function getPublicImageUrl(path: string | null): string {
  if (!path) return '/placeholder.jpg';
  
  // Si ya es URL completa, devolverla
  if (path.startsWith('http')) return path;
  
  // Limpiar el path (eliminar / si existe al inicio)
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  try {
    // Construir URL pública de Supabase
    const { data } = supabase.storage
      .from('imagenes-productos')
      .getPublicUrl(cleanPath);
    
    // Verificar que la URL sea válida
    if (data && data.publicUrl) {
      return data.publicUrl;
    }
  } catch (error) {
    console.error('Error generando URL para:', path, error);
  }
  
  // Fallback: construir URL manualmente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/imagenes-productos/${cleanPath}`;
  }
  
  return '/placeholder.jpg';
}

export function transformProduct(product: any): any {
  if (!product) return product;
  
  return {
    ...product,
    imageUrl: getPublicImageUrl(product.imageUrl),
    imageUrl2: product.imageUrl2 ? getPublicImageUrl(product.imageUrl2) : null,
    galleryImages: product.galleryImages?.map((img: string) => getPublicImageUrl(img)) || []
  };
}

export function transformProducts(products: any[]): any[] {
  if (!products) return [];
  return products.map(transformProduct);
}