'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- ACCIONES PARA ÓRDENES ---
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error('Error al actualizar orden:', error.message);
    throw new Error(`No se pudo actualizar la orden. Razón: ${error.message}`);
  }
  revalidatePath('/admin');
  return data;
}

// --- ACCIONES PARA PRODUCTOS ---
const getNumberOrNull = (formData: FormData, fieldName: string) => {
    const value = formData.get(fieldName) as string;
    return value ? Number(value) : null;
};
const getStringOrNull = (formData: FormData, fieldName: string) => {
    const value = formData.get(fieldName) as string;
    return value.trim() || null;
};
const getGalleryImages = (formData: FormData, fieldName: string) => {
    const value = formData.get(fieldName) as string;
    if (!value) return null;
    return value.split(',').map(url => url.trim()).filter(url => url);
};

export async function createProduct(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const newProduct = {
    name: getStringOrNull(formData, 'name'),
    price: getNumberOrNull(formData, 'price'),
    description: getStringOrNull(formData, 'description'),
    imageUrl: getStringOrNull(formData, 'imageUrl'),
    inStock: formData.get('inStock') === 'on',
    oldPrice: getNumberOrNull(formData, 'oldPrice'),
    imageUrl2: getStringOrNull(formData, 'imageUrl2'),
    videoUrl: getStringOrNull(formData, 'videoUrl'),
    categoria: getStringOrNull(formData, 'categoria'),
    es_mas_vendido: formData.get('es_mas_vendido') === 'on',
    es_destacado: formData.get('es_destacado') === 'on',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'on',
    es_destacado_semana: formData.get('es_destacado_semana') === 'on',
    texto_oferta: getStringOrNull(formData, 'texto_oferta'),
    promoSubtitle: getStringOrNull(formData, 'promoSubtitle'),
    galleryImages: getGalleryImages(formData, 'galleryImages'),
  };

  const { error } = await supabase.from('products').insert(newProduct);

  if (error) {
    console.error('Error de Supabase al crear producto:', error.message);
    throw new Error(`No se pudo crear el producto. Razón: ${error.message}`);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(productId: number, formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const updatedProduct = {
    name: getStringOrNull(formData, 'name'),
    price: getNumberOrNull(formData, 'price'),
    description: getStringOrNull(formData, 'description'),
    imageUrl: getStringOrNull(formData, 'imageUrl'),
    inStock: formData.get('inStock') === 'on',
    oldPrice: getNumberOrNull(formData, 'oldPrice'),
    imageUrl2: getStringOrNull(formData, 'imageUrl2'),
    videoUrl: getStringOrNull(formData, 'videoUrl'),
    categoria: getStringOrNull(formData, 'categoria'),
    es_mas_vendido: formData.get('es_mas_vendido') === 'on',
    es_destacado: formData.get('es_destacado') === 'on',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'on',
    es_destacado_semana: formData.get('es_destacado_semana') === 'on',
    texto_oferta: getStringOrNull(formData, 'texto_oferta'),
    promoSubtitle: getStringOrNull(formData, 'promoSubtitle'),
    galleryImages: getGalleryImages(formData, 'galleryImages'),
  };
  
  const { error } = await supabase
    .from('products')
    .update(updatedProduct)
    .eq('id', productId);

  if (error) {
    console.error('Error al actualizar producto:', error.message);
    throw new Error(`No se pudo actualizar el producto. Razón: ${error.message}`);
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${productId}`);
  redirect('/admin/products');
}

export async function deleteProduct(productId: number) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
    
  if (error) {
    console.error('Error al eliminar producto:', error.message);
    throw new Error(`No se pudo eliminar el producto. Razón: ${error.message}`);
  }
  revalidatePath('/admin/products');
}