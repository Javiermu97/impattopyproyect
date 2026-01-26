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
    price: Number(formData.get('price')),
    oldPrice: Number(formData.get('oldPrice')) || null,
    imageUrl: String(formData.get('imageUrl') || ''),
    imageUrl2: String(formData.get('imageUrl2') || ''),
    videoUrl: String(formData.get('videoUrl') || ''),
    categoria: String(formData.get('categoria') || ''),
    texto_oferta: String(formData.get('texto_oferta') || ''),
    descripcion_oferta: String(formData.get('descripcion_oferta') || ''), // Mantenido
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'TRUE' || formData.get('inStock') === 'on', 
    es_mas_vendido: formData.get('es_mas_vendido') === 'TRUE',
    es_destacado_semana: formData.get('es_destacado_semana') === 'TRUE',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'TRUE',
  };

  const { error } = await supabase.from('productos').insert(data);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/products');
  redirect('/admin/products?success=true');
}

export async function updateProduct(id: number, formData: FormData) {
  const supabase = await createAuthServerClient();
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
    descripcion_oferta: String(formData.get('descripcion_oferta') || ''), // Mantenido
    galleryImages: typeof galleryRaw === 'string' && galleryRaw.length > 0
        ? galleryRaw.split(',').map((img: string) => img.trim())
        : [],
    inStock: formData.get('inStock') === 'TRUE',
    es_mas_vendido: formData.get('es_mas_vendido') === 'TRUE',
    es_destacado_semana: formData.get('es_destacado_semana') === 'TRUE',
    es_destacado_hogar: formData.get('es_destacado_hogar') === 'TRUE',
  };

  const { error } = await supabase.from('productos').update(data).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${id}`);
  redirect('/admin/products?updated=true');
}

export async function deleteProduct(id: number) {
  const supabase = await createAuthServerClient();
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}

/* =========================================================
✅ CARACTERÍSTICAS
========================================================= */

export async function createCaracteristica(formData: FormData) {
  const supabase = await createAuthServerClient();
  const producto_id = Number(formData.get('producto_id'));

  const data = {
    "id del producto": producto_id, // Nombre exacto que confirmaste
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
  const supabase = await createAuthServerClient();
  
  // Usamos el nombre de columna con espacios como lo tienes en Supabase
  const { data, error: fetchError } = await supabase
    .from('caracteristicas')
    .select('"id del producto"')
    .eq('id', id)
    .single();

  const { error: deleteError } = await supabase.from('caracteristicas').delete().eq('id', id);
  
  if (deleteError) throw new Error(deleteError.message);
  
  if (data) {
    revalidatePath(`/admin/products/edit/${data["id del producto"]}`);
  }
}

export async function updateCaracteristica(id: number, formData: FormData) {
  const supabase = await createAuthServerClient();

  const titulo = String(formData.get('titulo'));
  const descripcion = String(formData.get('descripcion'));
  const imagen = String(formData.get('imagen'));
  const orden = Number(formData.get('orden')) || 0;
  const producto_id = formData.get('producto_id');

  const { error } = await supabase
    .from('caracteristicas')
    .update({
      titulo,
      descripcion,
      imagen,
      orden
    })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/edit/${producto_id}`);
  redirect(`/admin/products/edit/${producto_id}`);
}

/* =========================================================
✅ ÓRDENES
========================================================= */

export async function updateOrderStatus(id: number, status: string) {
  const supabase = await createAuthServerClient();

  const { error } = await supabase
    .from('orders') 
    .update({ status })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin');
  revalidatePath('/admin/orders');
}