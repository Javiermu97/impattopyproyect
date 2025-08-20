'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// ✅ CORREGIDO: Usamos 'imageUrl' y 'imageUrl2' en minúscula
const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  texto_oferta: z.string().trim().nullable().optional(),
  description: z.string().trim().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  imageUrl2: z.string().url().nullable().optional(),
  oldPrice: z.coerce.number().positive().nullable().optional(),
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

// --- ACCIONES DE PRODUCTOS ---
export async function createProduct(formData: FormData) {
  // ✅ CORREGIDO: Usamos 'imageUrl' y 'imageUrl2' en minúscula
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
    galleryImages: (formData.get('galleryImages') as string || '').split(',').map(url => url.trim()).filter(Boolean),
    inStock: formData.get('inStock') === 'on',
    es_destacado_semana: getBooleanOrNull(formData.get('es_destacado_semana') as string | null),
    es_destacado_hogar: getBooleanOrNull(formData.get('es_destacado_hogar') as string | null),
  };
  
  const validation = ProductSchema.safeParse(rawData);
  if (!validation.success) {
      console.error("ERROR DE VALIDACIÓN:", validation.error.flatten().fieldErrors);
      throw new Error(`Datos inválidos: ${validation.error.issues[0].message}`);
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('productos').insert(validation.data);
  if (error) {
      console.error("ERROR DE SUPABASE:", error);
      throw new Error(`No se pudo guardar el producto.`);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(productId: number, formData: FormData) {
    // ✅ CORREGIDO: Usamos 'imageUrl' y 'imageUrl2' en minúscula
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
        galleryImages: (formData.get('galleryImages') as string || '').split(',').map(url => url.trim()).filter(Boolean),
        inStock: formData.get('inStock') === 'on',
        es_destacado_semana: getBooleanOrNull(formData.get('es_destacado_semana') as string | null),
        es_destacado_hogar: getBooleanOrNull(formData.get('es_destacado_hogar') as string | null),
    };

  const validation = ProductSchema.safeParse(rawData);
  if (!validation.success) {
    console.error("ERROR DE VALIDACIÓN:", validation.error.flatten().fieldErrors);
    throw new Error(`Datos inválidos: ${validation.error.issues[0].message}`);
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('productos').update(validation.data).eq('id', productId);
  if (error) {
    console.error("ERROR DE SUPABASE:", error);
    throw new Error(`No se pudo actualizar el producto.`);
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${productId}`);
  redirect('/admin/products');
}