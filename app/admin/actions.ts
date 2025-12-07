'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/* =========================================================
✅ PRODUCTOS
========================================================= */

// ✅ CREAR PRODUCTO (ESTE FALTABA Y TE ROMPÍA EL BUILD)
export async function createProduct(formData: FormData) {
  const supabase = createClient();

  const galleryRaw = formData.get('galleryImages');

  const data = {
    name: String(formData.get('name')),
    description: String(formData.get('description') || ''),
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    galleryImages:
      typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'on',
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  };

  await supabase.from('productos').insert(data);

  revalidatePath('/admin/products');
}

// ✅ ACTUALIZAR PRODUCTO
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
    galleryImages:
      typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'on',
    es_mas_vendido: formData.get('es_mas_vendido') === 'true',
    es_destacado_semana: formData.get('es_destacado_semana') === 'true',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'true',
  };

  await supabase.from('productos').update(data).eq('id', id);

  revalidatePath('/admin/products');
}

// ✅ BORRAR PRODUCTO
export async function deleteProduct(id: number) {
  const supabase = createClient();

  await supabase.from('productos').delete().eq('id', id);

  revalidatePath('/admin/products');
}

/* =========================================================
✅ CARACTERÍSTICAS
========================================================= */

// ✅ CREAR CARACTERÍSTICA
export async function createCaracteristica(formData: FormData) {
  const supabase = createClient();

  const data = {
    producto_id: Number(formData.get('producto_id')),
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  await supabase.from('caracteristicas').insert(data);

  revalidatePath('/admin/products');
}

// ✅ BORRAR CARACTERÍSTICA
export async function deleteCaracteristica(id: number) {
  const supabase = createClient();

  await supabase.from('caracteristicas').delete().eq('id', id);

  revalidatePath('/admin/products');
}

/* =========================================================
✅ ÓRDENES
========================================================= */

// ✅ ACTUALIZAR ESTADO DE ORDEN
export async function updateOrderStatus(id: number, status: string) {
  const supabase = createClient();

  await supabase.from('orders').update({ status }).eq('id', id);

  revalidatePath('/admin/orders');
}

