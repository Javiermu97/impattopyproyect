'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAuthServerClient } from '@/lib/supabase/auth-server';

/* =========================================================
 ✅ PRODUCTOS
========================================================= */

export async function createProduct(formData: FormData) {
  const supabase = await createAuthServerClient();
  const galleryRaw = formData.get('galleryImages');
  
  const data = {
    name: String(formData.get('name')),
    descripcion: String(formData.get('descripcion') || ''),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0 ? 
      galleryRaw.split(',').map((img: string) => img.trim()) : [],
    inStock: formData.get('inStock') === 'on' || formData.get('inStock') === 'TRUE',
    es_mas_vendido: formData.get('es_mas_vendido') === 'TRUE' ? true : 
                    formData.get('es_mas_vendido') === 'FALSE' ? false : null,
    es_destacado_semana: formData.get('es_destacado_semana') === 'TRUE' ? true : 
                         formData.get('es_destacado_semana') === 'FALSE' ? false : null,
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'TRUE' ? true : 
                        formData.get('es_destacado_hogar') === 'FALSE' ? false : null,
  };

  const { error } = await supabase.from('productos').insert(data);
  
  if (error) {
    console.error('Error creando producto:', error);
    throw error;
  }

  revalidatePath('/admin/products');
  redirect('/admin/products?success=true');
}

export async function updateProduct(id: number, formData: FormData) {
  const supabase = await createAuthServerClient();
  const galleryRaw = formData.get('galleryImages');
  
  const data: any = {
    name: String(formData.get('name')),
    descripcion: String(formData.get('descripcion') || ''),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0 ? 
      galleryRaw.split(',').map((img: string) => img.trim()) : [],
    inStock: formData.get('inStock') === 'TRUE',
    es_mas_vendido: formData.get('es_mas_vendido') === 'TRUE' ? true : 
                    formData.get('es_mas_vendido') === 'FALSE' ? false : null,
    es_destacado_semana: formData.get('es_destacado_semana') === 'TRUE' ? true : 
                         formData.get('es_destacado_semana') === 'FALSE' ? false : null,
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'TRUE' ? true : 
                        formData.get('es_destacado_hogar') === 'FALSE' ? false : null,
  };

  const { error } = await supabase
    .from('productos')
    .update(data)
    .eq('id', id);

  if (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${id}`);
  redirect('/admin/products?updated=true');
}

export async function deleteProduct(id: number) {
  const supabase = await createAuthServerClient();
  
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }

  revalidatePath('/admin/products');
}

/* =========================================================
 ✅ CARACTERÍSTICAS
========================================================= */

export async function createCaracteristica(formData: FormData) {
  const supabase = await createAuthServerClient();
  const producto_id = Number(formData.get('producto_id'));
  
  const data = {
    producto_id: Number(formData.get('producto_id')),
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  const { error } = await supabase.from('caracteristicas').insert(data);
  
  if (error) {
    console.error('Error creando característica:', error);
    throw error;
  }

  revalidatePath(`/admin/products/edit/${producto_id}`);
}

export async function deleteCaracteristica(id: number) {
  const supabase = await createAuthServerClient();
  
  const { error } = await supabase
    .from('caracteristicas')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error eliminando característica:', error);
    throw error;
  }

  revalidatePath('/admin/products');
}

export async function updateCaracteristica(id: number, formData: FormData) {
  const supabase = await createAuthServerClient();
  const producto_id = formData.get('producto_id');
  
  if (!producto_id) {
    throw new Error('No se proporcionó producto_id');
  }

  const data = {
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  const { error } = await supabase
    .from('caracteristicas')
    .update(data)
    .eq('id', id);

  if (error) {
    console.error('Error actualizando característica:', error);
    throw error;
  }

  revalidatePath(`/admin/products/edit/${producto_id}`);
  // Redirige de vuelta al producto para evitar el 404
  redirect(`/admin/products/edit/${producto_id}`);
}

/* =========================================================
 ✅ ÓRDENES
========================================================= */

export async function updateOrderStatus(id: number, status: string) {
  const supabase = await createAuthServerClient();
  
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error actualizando estado de orden:', error);
    throw error;
  }

  revalidatePath('/admin/orders');
}