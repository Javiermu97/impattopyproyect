'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/* =========================
   CREATE PRODUCT
========================= */
export async function createProduct(formData: FormData) {
  const supabase = createClient();

  const product = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    oldPrice: formData.get('oldPrice')
      ? Number(formData.get('oldPrice'))
      : null,
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2'),
    videoUrl: formData.get('videoUrl'),
    galleryImages: formData
      .get('galleryImages')
      ?.toString()
      .split(',')
      .map((img) => img.trim()),
    categoria: formData.get('categoria'),
    texto_oferta: formData.get('texto_oferta'),
    inStock: formData.get('inStock') === 'on',
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    es_destacado_semana:
      formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar:
      formData.get('es_destacado_hogar') === 'true',
  };

  const { data, error } = await supabase
    .from('productos')
    .insert([product])
    .select()
    .single();

  if (error) throw error;

  redirect(`/admin/products/edit/${data.id}`);
}

/* =========================
   UPDATE PRODUCT
========================= */
export async function updateProduct(
  productId: number,
  formData: FormData
) {
  const supabase = createClient();

  await supabase
    .from('productos')
    .update({
      name: formData.get('name'),
      price: Number(formData.get('price')),
      oldPrice: formData.get('oldPrice')
        ? Number(formData.get('oldPrice'))
        : null,
      imageUrl: formData.get('imageUrl'),
      imageUrl2: formData.get('imageUrl2'),
      videoUrl: formData.get('videoUrl'),
      galleryImages: formData
        .get('galleryImages')
        ?.toString()
        .split(',')
        .map((img) => img.trim()),
      inStock: formData.get('inStock') === 'on',
      es_mas_vendido:
        formData.get('es_mas_vendido') === 'true'
          ? true
          : formData.get('es_mas_vendido') === 'false'
          ? false
          : null,
      es_destacado_semana:
        formData.get('es_destacado_semana') === 'true'
          ? true
          : formData.get('es_destacado_semana') === 'false'
          ? false
          : null,
      es_destacado_hogar:
        formData.get('es_destacado_hogar') === 'true'
          ? true
          : formData.get('es_destacado_hogar') === 'false'
          ? false
          : null,
    })
    .eq('id', productId);

  revalidatePath(`/admin/products/edit/${productId}`);
}

/* =========================
   CREATE CARACTERISTICA
========================= */
export async function createCaracteristica(formData: FormData) {
  const supabase = createClient();

  const producto_id = Number(formData.get('producto_id'));

  await supabase.from('caracteristicas').insert([
    {
      producto_id,
      titulo: formData.get('titulo'),
      descripcion: formData.get('descripcion'),
      imagen: formData.get('imagen'),
      orden: Number(formData.get('orden')) || 0,
    },
  ]);

  revalidatePath(`/admin/products/edit/${producto_id}`);
}

/* =========================
   DELETE CARACTERISTICA
========================= */
export async function deleteCaracteristica(id: number) {
  const supabase = createClient();

  await supabase.from('caracteristicas').delete().eq('id', id);

  revalidatePath('/admin/products');
}

/* =========================
   DELETE PRODUCT
========================= */
export async function deleteProduct(id: number) {
  const supabase = createClient();

  await supabase.from('productos').delete().eq('id', id);

  revalidatePath('/admin/products');
}

