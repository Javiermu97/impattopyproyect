'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/* =========================================================
✅ PRODUCTOS (Basado en tus campos de NewProductPage)
========================================================= */

export async function createProduct(formData: FormData) {
  const supabase = createClient();
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

  const { data: newProduct, error } = await supabase
    .from('productos')
    .insert(data)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/admin/products');
  redirect(`/admin/products/edit/${newProduct.id}`);
}

export async function updateProduct(id: number, formData: FormData) {
  const supabase = createClient();
  const galleryRaw = formData.get('galleryImages');

  const data = {
    name: String(formData.get('name')),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''), // Añadido
    texto_oferta: String(formData.get('texto_oferta') || ''), // Añadido
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'on',
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  };

  await supabase.from('productos').update(data).eq('id', id);

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${id}`);
}

/* =========================================================
✅ CARACTERÍSTICAS (Sincronizado con Imagen 2 y 4 de Supabase)
========================================================= */

export async function createCaracteristica(formData: FormData) {
  const supabase = createClient();
  const producto_id = Number(formData.get('producto_id'));

  const data = {
    producto_id: producto_id, // Nombre exacto en Supabase
    titulo: String(formData.get('titulo')), // Nombre exacto en Supabase
    descripcion: String(formData.get('descripcion') || ''), // Nombre exacto en Supabase
    imagen: String(formData.get('imagen') || ''), // Nombre exacto en Supabase
    orden: Number(formData.get('orden')) || 0, // Nombre exacto en Supabase
  };

  await supabase.from('caracteristicas').insert(data);
  revalidatePath(`/admin/products/edit/${producto_id}`);
}

export async function deleteCaracteristica(id: number) {
  const supabase = createClient();
  
  const { data } = await supabase
    .from('caracteristicas')
    .select('producto_id')
    .eq('id', id)
    .single();

  await supabase.from('caracteristicas').delete().eq('id', id);

  if (data) revalidatePath(`/admin/products/edit/${data.producto_id}`);
}