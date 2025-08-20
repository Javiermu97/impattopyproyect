'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Zod Schema basado en la lista de columnas que me proporcionaste
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


  // ===== INICIA EL CAMBIO CLAVE AQUÍ =====
  // Ahora le pedimos a Supabase que nos devuelva los datos del producto que acaba de crear
  const { data, error } = await supabase
    .from('productos')
    .insert(validation.data)
    .select() // <-- AÑADIMOS ESTO
    .single(); // <-- Y ESTO

  if (error) {
      console.error("ERROR DE SUPABASE:", error);
      throw new Error(`No se pudo guardar el producto.`);
  }

  // Si no hay datos, lanzamos un error para seguridad
  if (!data) {
    throw new Error('No se pudo obtener el producto recién creado.');
  }

  // Refrescamos la caché de la lista de productos
  revalidatePath('/admin/products');
  
  // ¡Redirigimos a la página de EDICIÓN del nuevo producto!
  redirect(`/admin/products/edit/${data.id}`); 
  // ===== TERMINA EL CAMBIO CLAVE AQUÍ =====
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

// ✅ FUNCIÓN RESTAURADA
export async function deleteProduct(productId: number) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('productos').delete().eq('id', productId);
  if (error) {
    console.error('Error al eliminar producto:', error);
    throw new Error('No se pudo eliminar el producto.');
  }
  revalidatePath('/admin/products');
  redirect('/admin/products');
}


// --- ACCIÓN PARA ÓRDENES ---
// ✅ FUNCIÓN RESTAURADA
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error('Error al actualizar el estado de la orden:', error);
    throw new Error('No se pudo actualizar el estado de la orden.');
  }

  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
}



// --- ZOD SCHEMA PARA CARACTERISTICAS (CORREGIDO) ---
// Define las reglas para una característica válida, coincidiendo con tu tabla
const CaracteristicaSchema = z.object({
  titulo: z.string().min(3, { message: 'El título es requerido.' }),
  orden: z.coerce.number().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  imagen: z.string().url({ message: 'La URL de la imagen no es válida.' }).nullable().optional(),
  producto_id: z.coerce.number(),
});


// --- ACCIONES PARA CARACTERISTICAS (CORREGIDO) ---

export async function createCaracteristica(formData: FormData) {
  // Mapeo directo de los campos del formulario a los nombres de la base de datos
  const rawData = {
    titulo: formData.get('titulo'),
    orden: formData.get('orden'),
    descripcion: formData.get('descripcion'),
    imagen: formData.get('imagen'),
    producto_id: formData.get('producto_id'),
  };

  const validation = CaracteristicaSchema.safeParse(rawData);

  if (!validation.success) {
    console.error("ERROR DE VALIDACIÓN:", validation.error.flatten().fieldErrors);
    throw new Error(`Datos de característica inválidos: ${validation.error.issues[0].message}`);
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('caracteristicas').insert(validation.data);

  if (error) {
    console.error("ERROR DE SUPABASE AL CREAR CARACTERÍSTICA:", error);
    throw new Error('No se pudo guardar la característica.');
  }

  // Refresca la página de edición para mostrar la nueva característica
  revalidatePath(`/admin/products/edit/${validation.data.producto_id}`);
}

export async function deleteCaracteristica(caracteristicaId: number, productoId: number) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('caracteristicas').delete().eq('id', caracteristicaId);

  if (error) {
    console.error('Error al eliminar característica:', error);
    throw new Error('No se pudo eliminar la característica.');
  }

  revalidatePath(`/admin/products/edit/${productoId}`);
}