'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

// ==========================
// ✅ ACTUALIZAR PRODUCTO
// ==========================
export async function updateProduct(productId: number, formData: FormData) {
  const supabase = createClient();

  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const oldPrice = Number(formData.get('oldPrice')) || null;
  const imageUrl = formData.get('imageUrl') as string;
  const imageUrl2 = formData.get('imageUrl2') as string;
  const videoUrl = formData.get('videoUrl') as string;
  const galleryImages = (formData.get('galleryImages') as string)
    ?.split(',')
    .map((i) => i.trim());

  const inStock = formData.get('inStock') === 'on';

  const es_mas_vendido =
    formData.get('es_mas_vendido') === 'true'
      ? true
      : formData.get('es_mas_vendido') === 'false'
      ? false
      : null;

  const es_destacado_semana =
    formData.get('es_destacado_semana') === 'true'
      ? true
      : formData.get('es_destacado_semana') === 'false'
      ? false
      : null;

  const es_destacado_hogar =
    formData.get('es_destacado_hogar') === 'true'
      ? true
      : formData.get('es_destacado_hogar') === 'false'
      ? false
      : null;

  await supabase
    .from('productos')
    .update({
      name,
      price,
      oldPrice,
      imageUrl,
      imageUrl2,
      videoUrl,
      galleryImages,
      inStock,
      es_mas_vendido,
      es_destacado_semana,
      es_destacado_hogar,
    })
    .eq('id', productId);

  revalidatePath('/admin/products');
}

// ==========================
// ✅ CREAR CARACTERÍSTICA
// ==========================
export async function createCaracteristica(formData: FormData) {
  const supabase = createClient();

  const producto_id = Number(formData.get('producto_id'));
  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const imagen = formData.get('imagen') as string;
  const orden = Number(formData.get('orden'));

  await supabase.from('caracteristicas').insert({
    producto_id,
    titulo,
    descripcion,
    imagen,
    orden,
  });

  revalidatePath(`/admin/products/edit/${producto_id}`);
}

// ==========================
// ✅ ELIMINAR CARACTERÍSTICA (✅ 2 ARGUMENTOS)
// ==========================
export async function deleteCaracteristica(
  caracteristicaId: number,
  productoId: number
) {
  const supabase = createClient();

  await supabase
    .from('caracteristicas')
    .delete()
    .eq('id', caracteristicaId);

  revalidatePath(`/admin/products/edit/${productoId}`);
}

// ==========================
// ✅ ACTUALIZAR ESTADO DE ORDEN
// ==========================
export async function updateOrderStatus(orderId: number, status: string) {
  const supabase = createClient();

  await supabase.from('orders').update({ status }).eq('id', orderId);

  revalidatePath('/admin');
}

