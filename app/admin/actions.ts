'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAuthServerClient } from '@/lib/supabase/auth-server';

/* =========================================================
✅ PRODUCTOS
========================================================= */

export async function createProduct(formData: FormData) {
  const supabase = await createAuthServerClient(); // <--- Corregido con AWAIT
  const galleryRaw = formData.get('galleryImages');

  const data = {
    name: String(formData.get('name')),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'on',
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  };

  const { error } = await supabase.from('productos').insert(data);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/products');
  redirect('/admin/products?success=true');
}

export async function updateProduct(id: number, formData: FormData) {
  const supabase = await createAuthServerClient(); // <--- Corregido con AWAIT
  const galleryRaw = formData.get('galleryImages');

  const data = {
    name: String(formData.get('name')),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'on',
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  };

  const { error } = await supabase.from('productos').update(data).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/products');
  redirect('/admin/products?updated=true');
}

export async function deleteProduct(id: number) {
  const supabase = await createAuthServerClient(); // <--- Corregido con AWAIT
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}

/* =========================================================
✅ CARACTERÍSTICAS
========================================================= */

export async function createCaracteristica(formData: FormData) {
  const supabase = await createAuthServerClient(); // <--- Corregido con AWAIT
  const producto_id = Number(formData.get('producto_id'));

  const data = {
    producto_id,
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  const { error } = await supabase.from('caracteristicas').insert(data);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/edit/${producto_id}`);
}

export async function deleteCaracteristica(id: number) {
  const supabase = await createAuthServerClient(); // <--- Corregido con AWAIT
  const { data } = await supabase.from('caracteristicas').select('producto_id').eq('id', id).single();
  const { error } = await supabase.from('caracteristicas').delete().eq('id', id);
  if (error) throw new Error(error.message);
  if (data) revalidatePath(`/admin/products/edit/${data.producto_id}`);
}

/* =========================================================
✅ ÓRDENES
========================================================= */

export async function updateOrderStatus(id: number, status: string) {
  const supabase = await createAuthServerClient(); // <--- Corregido con AWAIT

  const { error } = await supabase
    .from('orders') 
    .update({ status })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin');
  revalidatePath('/admin/orders');
}