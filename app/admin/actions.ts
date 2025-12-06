// actions.ts
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// --- SCHEMAS ---
const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  texto_oferta: z.string().trim().nullable().optional(),
  description: z.string().trim().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  imageUrl2: z.string().url().nullable().optional(),
  oldPrice: z.preprocess(
    (val) => {
      if (val === '' || val === null) return null;
      const numero = Number(val);
      return Number.isNaN(numero) ? null : (numero <= 0 ? null : numero);
    },
    z.number().positive().nullable().optional()
  ),
  categoria: z.string().trim().nullable().optional(),
  es_mas_vendido: z.boolean().nullable().optional(),
  videoUrl: z.string().url().nullable().optional(),
  galleryImages: z.array(z.string().url()).nullable().optional(),
  inStock: z.boolean(),
  es_destacado_semana: z.boolean().nullable().optional(),
  es_destacado_hogar: z.boolean().nullable().optional(),
});

const getBooleanOrNull = (value: string | null) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
};

// -----------------------------------------------------------------
// getSupabase: usa el helper oficial para Server Actions
// -----------------------------------------------------------------
function getSupabase() {
  // createServerActionClient maneja correctamente `cookies` de Next
  return createServerActionClient({ cookies });
}

// -----------------------------------------------------------------
// CRUD productos / órdenes / características
// -----------------------------------------------------------------
export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    texto_oferta: formData.get('texto_oferta'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2') || null,
    oldPrice: formData.get('oldPrice'),
    categoria: formData.get('categoria'),
    es_mas_vendido: getBooleanOrNull(formData.get('es_mas_vendido') as string | null),
    videoUrl: formData.get('videoUrl') || null,
    galleryImages: (formData.get('galleryImages') as string || '')
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean),
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: getBooleanOrNull(formData.get('es_destacado_semana') as string | null),
    es_destacado_hogar: getBooleanOrNull(formData.get('es_destacado_hogar') as string | null),
  };

  const validation = ProductSchema.safeParse(rawData);

  if (!validation.success) {
    console.error('ERROR DE VALIDACIÓN:', validation.error.flatten().fieldErrors);
    const primerError = validation.error.issues[0];
    throw new Error(`Error en ${String(primerError.path[0])}: ${primerError.message}`);
  }

  const supabase = getSupabase();

  const { error, data } = await supabase.from('productos').insert(validation.data).select();

  if (error) {
    console.error('ERROR DE SUPABASE (createProduct):', error);
    throw new Error(`No se pudo guardar: ${error.message}`);
  }

  console.info('Producto creado correctamente, id:', data?.[0]?.id ?? '[sin id]');
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(productId: number, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    texto_oferta: formData.get('texto_oferta'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2') || null,
    oldPrice: formData.get('oldPrice'),
    categoria: formData.get('categoria'),
    es_mas_vendido: getBooleanOrNull(formData.get('es_mas_vendido') as string | null),
    videoUrl: formData.get('videoUrl') || null,
    galleryImages: (formData.get('galleryImages') as string || '')
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean),
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: getBooleanOrNull(formData.get('es_destacado_semana') as string | null),
    es_destacado_hogar: getBooleanOrNull(formData.get('es_destacado_hogar') as string | null),
  };

  const validation = ProductSchema.safeParse(rawData);
  if (!validation.success) {
    console.error('ERROR DE VALIDACIÓN:', validation.error.flatten().fieldErrors);
    const primerError = validation.error.issues[0];
    throw new Error(`Error en ${String(primerError.path[0])}: ${primerError.message}`);
  }

  const supabase = getSupabase();

  const { error, data } = await supabase.from('productos').update(validation.data).eq('id', productId).select();

  if (error) {
    console.error('ERROR DE SUPABASE (updateProduct):', error);
    throw new Error(`No se pudo actualizar el producto: ${error.message}`);
  }

  console.info('Producto actualizado correctamente, id:', productId);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(productId: number) {
  const supabase = getSupabase();

  const { error } = await supabase.from('productos').delete().eq('id', productId);

  if (error) {
    console.error('Error al eliminar producto:', error);
    throw new Error('No se pudo eliminar el producto.');
  }

  console.info('Producto eliminado, id:', productId);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = getSupabase();

  const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);

  if (error) {
    console.error('Error al actualizar orden:', error);
    throw new Error('No se pudo actualizar la orden.');
  }

  console.info('Orden actualizada:', orderId, '->', newStatus);
  revalidatePath('/admin/orders');
  redirect('/admin/orders');
}

const CaracteristicaSchema = z.object({
  titulo: z.string().min(3, { message: 'El título es requerido.' }),
  orden: z.coerce.number().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  imagen: z.string().url({ message: 'URL de imagen inválida.' }).nullable().optional(),
  producto_id: z.coerce.number(),
});

export async function createCaracteristica(formData: FormData) {
  const rawData = {
    titulo: formData.get('titulo'),
    orden: formData.get('orden'),
    descripcion: formData.get('descripcion'),
    imagen: formData.get('imagen'),
    producto_id: formData.get('producto_id'),
  };

  const validation = CaracteristicaSchema.safeParse(rawData);

  if (!validation.success) {
    console.error('ERROR CARACTERÍSTICA:', validation.error.flatten().fieldErrors);
    throw new Error(`Datos inválidos: ${validation.error.issues[0].message}`);
  }

  const supabase = getSupabase();

  const { error } = await supabase.from('caracteristicas').insert(validation.data);

  if (error) {
    console.error('ERROR SUPABASE CARACTERÍSTICA:', error);
    throw new Error('No se pudo guardar la característica.');
  }

  console.info('Característica creada para producto:', validation.data.producto_id);
  revalidatePath('/admin/products');
}

export async function deleteCaracteristica(caracteristicaId: number, productoId: number) {
  const supabase = getSupabase();

  const { error } = await supabase.from('caracteristicas').delete().eq('id', caracteristicaId);

  if (error) {
    console.error('Error eliminando característica:', error);
    throw new Error('No se pudo eliminar.');
  }

  console.info('Característica eliminada, id:', caracteristicaId, 'producto:', productoId);
  revalidatePath('/admin/products');
}

