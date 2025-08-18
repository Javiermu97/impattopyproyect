'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ====================================================================
// VERSIÓN REFORZADA DEL CLIENTE DE SUPABASE
// ====================================================================
const getSupabaseClient = () => {
  // Verificamos que las variables de entorno estén presentes
  // Este código se ejecuta en el servidor, por lo que puede acceder a process.env
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Si las claves no están, lanzamos un error claro.
    // Esto es lo que veremos en los logs si el problema persiste.
    throw new Error('Supabase URL or Key is missing in environment variables.');
  }
  
  // Usamos el cliente normal de Supabase para las Server Actions
  return createServerActionClient({ cookies });
};


// --- ACCIONES PARA ÓRDENES ---
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = getSupabaseClient(); // Usamos nuestra nueva función
  // ... el resto de la función es igual
  const { data, error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error('Error en Server Action (updateOrderStatus):', error.message);
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
const getStringOrNull = (formData: FormData, fieldName:string) => {
    const value = formData.get(fieldName) as string;
    return value || null;
};

export async function createProduct(formData: FormData) {
  const supabase = getSupabaseClient(); // Usamos nuestra nueva función

  const newProduct = {
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    inStock: formData.get('inStock') === 'on',
    oldPrice: getNumberOrNull(formData, 'oldPrice'),
    imageUrl2: getStringOrNull(formData, 'imageUrl2'),
    videoUrl: getStringOrNull(formData, 'videoUrl'),
    categoria: getStringOrNull(formData, 'categoria'),
    es_mas_vendido: formData.get('es_mas_vendido') === 'on',
    es_destacado: formData.get('es_destacado') === 'on',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'on',
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
  const supabase = getSupabaseClient(); // Usamos nuestra nueva función
  // ... el resto de la función es igual
  const updatedProduct = {
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    inStock: formData.get('inStock') === 'on',
    oldPrice: getNumberOrNull(formData, 'oldPrice'),
    imageUrl2: getStringOrNull(formData, 'imageUrl2'),
    videoUrl: getStringOrNull(formData, 'videoUrl'),
    categoria: getStringOrNull(formData, 'categoria'),
    es_mas_vendido: formData.get('es_mas_vendido') === 'on',
    es_destacado: formData.get('es_destacado') === 'on',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'on',
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
  const supabase = getSupabaseClient(); // Usamos nuestra nueva función
  // ... el resto de la función es igual
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

