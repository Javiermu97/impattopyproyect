// app/admin/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

/* ---------------- SCHEMAS ---------------- */

const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  texto_oferta: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  imageUrl2: z.string().url().nullable().optional(),
  oldPrice: z.coerce.number().nullable().optional(),
  categoria: z.string().nullable().optional(),
  es_mas_vendido: z.coerce.boolean().nullable().optional(),
  videoUrl: z.string().url().nullable().optional(),
  galleryImages: z.array(z.string().url()).nullable().optional(),
  inStock: z.boolean(),
  es_destacado_semana: z.coerce.boolean().nullable().optional(),
  es_destacado_hogar: z.coerce.boolean().nullable().optional(),
});

const CaracteristicaSchema = z.object({
  titulo: z.string().min(3),
  orden: z.coerce.number().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  imagen: z.string().url().nullable().optional(),
  producto_id: z.coerce.number(),
});

/* ---------------- HELPERS ---------------- */

function parseBoolean(value: string | null) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
}

/* ---------------- PRODUCTOS ---------------- */

export async function createProduct(formData: FormData) {
  // createClient() devuelve supabaseServer (no async aquí)
  const supabase = createClient();

  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    texto_oferta: formData.get('texto_oferta'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2'),
    oldPrice: formData.get('oldPrice'),
    categoria: formData.get('categoria'),
    es_mas_vendido: parseBoolean(formData.get('es_mas_vendido') as string | null),
    videoUrl: formData.get('videoUrl'),
    galleryImages: (formData.get('galleryImages') as string || '')
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean),
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: parseBoolean(formData.get('es_destacado_semana') as string | null),
    es_destacado_hogar: parseBoolean(formData.get('es_destacado_hogar') as string | null),
  };

  const validation = ProductSchema.safeParse(rawData);
  if (!validation.success) {
    console.error('ERROR DE VALIDACIÓN (createProduct):', validation.error.flatten().fieldErrors);
    throw new Error('Datos de producto inválidos');
  }

  const { error, data } = await supabase.from('productos').insert(validation.data).select();

  if (error) {
    console.error('ERROR SUPABASE (createProduct):', error);
    throw new Error('No se pudo guardar el producto: ' + error.message);
  }

  console.info('Producto creado:', data?.[0]?.id ?? '[sin id]');
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(productId: number, formData: FormData) {
  const supabase = createClient();

  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    texto_oferta: formData.get('texto_oferta'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2'),
    oldPrice: formData.get('oldPrice'),
    categoria: formData.get('categoria'),
    es_mas_vendido: parseBoolean(formData.get('es_mas_vendido') as string | null),
    videoUrl: formData.get('videoUrl'),
    galleryImages: (formData.get('galleryImages') as string || '')
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean),
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: parseBoolean(formData.get('es_destacado_semana') as string | null),
    es_destacado_hogar: parseBoolean(formData.get('es_destacado_hogar') as string | null),
  };

  const validation = ProductSchema.safeParse(rawData);
  if (!validation.success) {
    console.error('ERROR DE VALIDACIÓN (updateProduct):', validation.error.flatten().fieldErrors);
    throw new Error('Datos de producto inválidos');
  }

  const { error } = await supabase.from('productos').update(validation.data).eq('id', productId);

  if (error) {
    console.error('ERROR SUPABASE (updateProduct):', error);
    throw new Error('No se pudo actualizar el producto: ' + error.message);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(productId: number) {
  const supabase = createClient();

  const { error } = await supabase.from('productos').delete().eq('id', productId);
  if (error) {
    console.error('ERROR SUPABASE (deleteProduct):', error);
    throw new Error('No se pudo eliminar el producto: ' + error.message);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

/* ---------------- CARACTERISTICAS ---------------- */

export async function createCaracteristica(formData: FormData) {
  const supabase = createClient();

  const rawData = {
    titulo: formData.get('titulo'),
    orden: formData.get('orden'),
    descripcion: formData.get('descripcion'),
    imagen: formData.get('imagen'),
    producto_id: formData.get('producto_id'),
  };

  const validation = CaracteristicaSchema.safeParse(rawData);
  if (!validation.success) {
    console.error('ERROR CARACTERÍSTICA (createCaracteristica):', validation.error.flatten().fieldErrors);
    throw new Error('Datos de característica inválidos');
  }

  const { error } = await supabase.from('caracteristicas').insert(validation.data);
  if (error) {
    console.error('ERROR SUPABASE (createCaracteristica):', error);
    throw new Error('No se pudo guardar la característica: ' + error.message);
  }

  revalidatePath('/admin/products');
}

export async function deleteCaracteristica(caracteristicaId: number) {
  const supabase = createClient();

  const { error } = await supabase.from('caracteristicas').delete().eq('id', caracteristicaId);
  if (error) {
    console.error('ERROR SUPABASE (deleteCaracteristica):', error);
    throw new Error('No se pudo eliminar la característica: ' + error.message);
  }

  revalidatePath('/admin/products');
}

/* ---------------- ORDENES ---------------- */

export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = createClient();

  const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
  if (error) {
    console.error('ERROR SUPABASE (updateOrderStatus):', error);
    throw new Error('No se pudo actualizar la orden: ' + error.message);
  }

  revalidatePath('/admin/orders');
  redirect('/admin/orders');
}

