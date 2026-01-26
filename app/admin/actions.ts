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
    "descripción": String(formData.get('descripcion_oferta') || ''),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages:
      typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'on' || formData.get('inStock') === 'TRUE',
    es_mas_vendido: formData.get('es_mas_vendido') === 'TRUE',
    es_destacado_semana: formData.get('es_destacado_semana') === 'TRUE',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'TRUE',
  };

  await supabase.from('productos').insert(data);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: number, formData: FormData) {
  const supabase = await createAuthServerClient();
  const galleryRaw = formData.get('galleryImages');

  const data = {
    name: String(formData.get('name')),
    "descripción": String(formData.get('descripcion_oferta') || ''),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages:
      typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'TRUE',
    es_mas_vendido: formData.get('es_mas_vendido') === 'TRUE',
    es_destacado_semana: formData.get('es_destacado_semana') === 'TRUE',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'TRUE',
  };

  await supabase.from('productos').update(data).eq('id', id);

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${id}`);

  // 🔁 VUELVE AL EDITOR (como antes)
  redirect(`/admin/products/edit/${id}`);
}

export async function deleteProduct(id: number) {
  const supabase = await createAuthServerClient();
  await supabase.from('productos').delete().eq('id', id);
  revalidatePath('/admin/products');
}

/* =========================================================
✅ CARACTERÍSTICAS
========================================================= */

export async function createCaracteristica(formData: FormData) {
  const supabase = await createAuthServerClient();
  const producto_id = Number(formData.get('producto_id'));

  const data = {
    "id del producto": producto_id,
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  await supabase.from('caracteristicas').insert(data);
  revalidatePath(`/admin/products/edit/${producto_id}`);
}

export async function deleteCaracteristica(id: number) {
  const supabase = await createAuthServerClient();
  await supabase.from('caracteristicas').delete().eq('id', id);
  revalidatePath('/admin/products');
}

export async function updateCaracteristica(id: number, formData: FormData) {
  const supabase = await createAuthServerClient();
  const producto_id = formData.get('producto_id');

  const data = {
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  await supabase.from('caracteristicas').update(data).eq('id', id);

  revalidatePath(`/admin/products/edit/${producto_id}`);
  redirect(`/admin/products/edit/${producto_id}`);
}
