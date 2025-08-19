'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- ACCIONES PARA ÓRDENES (sin cambios) ---
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = createServerActionClient({ cookies });
  // ... (código se mantiene igual)
}

// --- ACCIONES PARA PRODUCTOS (VERSIÓN FINAL) ---

// Funciones auxiliares para procesar los datos del formulario
const getNumberOrNull = (formData: FormData, fieldName: string) => {
    const value = formData.get(fieldName) as string;
    return value ? Number(value) : null;
};
const getStringOrNull = (formData: FormData, fieldName: string) => {
  const rawValue = formData.get(fieldName);
  if (typeof rawValue === 'string') {
    const trimmed = rawValue.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  return null;
};
const getGalleryImages = (formData: FormData, fieldName: string) => {
  const rawValue = formData.get(fieldName);
  if (typeof rawValue !== 'string' || rawValue.trim() === '') {
    return null;
  }
  return rawValue.split(',')
    .map(url => url.trim())
    .filter(url => url.length > 0);
};
// NUEVA FUNCIÓN para manejar los valores booleanos que pueden ser nulos
const getBooleanOrNull = (formData: FormData, fieldName: string) => {
    const value = formData.get(fieldName) as string;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
};

export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies });

  const newProduct = {
    nombre: getStringOrNull(formData, 'nombre'),
    precio: getNumberOrNull(formData, 'precio'),
    descripcion: getStringOrNull(formData, 'descripcion'),
    imageUrl: getStringOrNull(formData, 'imageUrl'),
    inStock: formData.get('inStock') === 'on', // Este campo no es nulo
    precio_anterior: getNumberOrNull(formData, 'precio_anterior'),
    imageUrl2: getStringOrNull(formData, 'imageUrl2'),
    videoUrl: getStringOrNull(formData, 'videoUrl'),
    categorias: getStringOrNull(formData, 'categorias'),
    texto_oferta: getStringOrNull(formData, 'texto_oferta'),
    subtitulo_promo: getStringOrNull(formData, 'subtitulo_promo'),
    galleryImages: getGalleryImages(formData, 'galleryImages'),
    // Campos booleanos que pueden ser nulos
    es_mas_vendido: getBooleanOrNull(formData, 'es_mas_vendido'),
    es_destacado: getBooleanOrNull(formData, 'es_destacado'),
    es_destacado_hogar: getBooleanOrNull(formData, 'es_destacado_hogar'),
    es_destacado_semana: getBooleanOrNull(formData, 'es_destacado_semana'),
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
  const supabase = createServerActionClient({ cookies });
  const updatedProduct = {
    nombre: getStringOrNull(formData, 'nombre'),
    precio: getNumberOrNull(formData, 'precio'),
    descripcion: getStringOrNull(formData, 'descripcion'),
    imageUrl: getStringOrNull(formData, 'imageUrl'),
    inStock: formData.get('inStock') === 'on',
    precio_anterior: getNumberOrNull(formData, 'precio_anterior'),
    imageUrl2: getStringOrNull(formData, 'imageUrl2'),
    videoUrl: getStringOrNull(formData, 'videoUrl'),
    categorias: getStringOrNull(formData, 'categorias'),
    texto_oferta: getStringOrNull(formData, 'texto_oferta'),
    subtitulo_promo: getStringOrNull(formData, 'subtitulo_promo'),
    galleryImages: getGalleryImages(formData, 'galleryImages'),
    es_mas_vendido: getBooleanOrNull(formData, 'es_mas_vendido'),
    es_destacado: getBooleanOrNull(formData, 'es_destacado'),
    es_destacado_hogar: getBooleanOrNull(formData, 'es_destacado_hogar'),
    es_destacado_semana: getBooleanOrNull(formData, 'es_destacado_semana'),
  };
  const { error } = await supabase.from('productos').update(updatedProduct).eq('id', productId);

  if (error) {
    console.error('Error al actualizar producto:', error.message);
    throw new Error(`No se pudo actualizar el producto. Razón: ${error.message}`);
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${productId}`);
  redirect('/admin/products');
}

export async function deleteProduct(productId: number) {
    // ... (código se mantiene igual)
}