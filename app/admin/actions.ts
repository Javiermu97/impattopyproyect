'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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
})

/* ---------------- PRODUCTOS ---------------- */

export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    texto_oferta: formData.get('texto_oferta'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2'),
    oldPrice: formData.get('oldPrice'),
    categoria: formData.get('categoria'),
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    videoUrl: formData.get('videoUrl'),
    galleryImages: [],
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  }

  const validation = ProductSchema.safeParse(rawData)

  if (!validation.success) {
    throw new Error('Datos inválidos')
  }

  const { error } = await supabaseServer
    .from('productos')
    .insert(validation.data)

  if (error) {
    console.error('ERROR SUPABASE:', error)
    throw new Error('No se pudo guardar el producto')
  }

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function updateProduct(productId: number, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    texto_oferta: formData.get('texto_oferta'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    imageUrl2: formData.get('imageUrl2'),
    oldPrice: formData.get('oldPrice'),
    categoria: formData.get('categoria'),
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    videoUrl: formData.get('videoUrl'),
    galleryImages: [],
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  }

  const validation = ProductSchema.safeParse(rawData)

  if (!validation.success) {
    throw new Error('Datos inválidos')
  }

  const { error } = await supabaseServer
    .from('productos')
    .update(validation.data)
    .eq('id', productId)

  if (error) throw new Error('No se pudo actualizar')

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function deleteProduct(productId: number) {
  const { error } = await supabaseServer
    .from('productos')
    .delete()
    .eq('id', productId)

  if (error) throw new Error('No se pudo eliminar')

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

/* ---------------- ORDENES ---------------- */

export async function updateOrderStatus(orderId: number, newStatus: string) {
  const { error } = await supabaseServer
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) throw new Error('No se pudo actualizar la orden')

  revalidatePath('/admin/orders')
  redirect('/admin/orders')
}

