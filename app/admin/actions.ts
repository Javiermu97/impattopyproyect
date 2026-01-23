'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // Importante para la redirección
import { createClient } from '@/lib/supabase/server';

/* =========================================================
✅ PRODUCTOS
========================================================= */

// ✅ CREAR PRODUCTO Y REDIRIGIR A EDICIÓN
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

  // Insertamos y obtenemos el ID del nuevo producto
  const { data: newProduct, error } = await supabase
    .from('productos')
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Error al crear el producto:", error.message);
    return;
  }

  // Actualizamos el cache de la lista de productos
  revalidatePath('/admin/products');

  // Redirigimos automáticamente a la página de edición para cargar características
  redirect(`/admin/products/edit/${newProduct.id}`);
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
  revalidatePath(`/admin/products/edit/${id}`);
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
  const productoId = Number(formData.get('producto_id'));

  const data = {
    producto_id: productoId,
    titulo: String(formData.get('titulo')),
    descripcion: String(formData.get('descripcion') || ''),
    imagen: String(formData.get('imagen') || ''),
    orden: Number(formData.get('orden')) || 0,
  };

  const { error } = await supabase.from('caracteristicas').insert(data);
  
  if (error) {
    console.error("Error al crear característica:", error.message);
    return;
  }

  // Revalidamos la ruta específica de edición para que la lista se actualice
  revalidatePath(`/admin/products/edit/${productoId}`);
}

// ✅ BORRAR CARACTERÍSTICA
export async function deleteCaracteristica(id: number) {
  const supabase = createClient();

  // Primero obtenemos el ID del producto para revalidar la ruta después
  const { data: charData } = await supabase
    .from('caracteristicas')
    .select('producto_id')
    .eq('id', id)
    .single();

  await supabase.from('caracteristicas').delete().eq('id', id);

  if (charData) {
    revalidatePath(`/admin/products/edit/${charData.producto_id}`);
  }
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