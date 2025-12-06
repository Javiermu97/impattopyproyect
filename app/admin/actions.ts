'use server';

// 1. IMPORTAMOS LA LIBRERÍA ESTÁNDAR (NO LA VIEJA DE AUTH-HELPERS)
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// --- ZOD SCHEMA (REGLAS DE VALIDACIÓN) ---
const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  texto_oferta: z.string().trim().nullable().optional(),
  description: z.string().trim().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  imageUrl2: z.string().url().nullable().optional(),

  // Corrección para oldPrice: Vacío o 0 se convierte en NULL
  oldPrice: z.preprocess(
    (val) => {
      if (val === '' || val === null) return null;
      const numero = Number(val);
      return numero <= 0 ? null : numero;
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

// 2. FUNCIÓN DE CONEXIÓN MANUAL (SOLUCIÓN AL ERROR DE COOKIES)
async function getSupabase() {
  const cookieStore = await cookies(); // Esperamos la promesa (Next 15)
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          // Pasamos las cookies manualmente
          cookie: cookieStore.toString(),
        },
      },
    }
  );
}

// --- ACCIÓN: CREAR PRODUCTO ---
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
      const primerError = validation.error.issues[0];
      throw new Error(`Error en ${String(primerError.path[0])}: ${primerError.message}`);
  }

  // Usamos la nueva conexión
  const supabase = await getSupabase();

  const { error } = await supabase
    .from('productos')
    .insert(validation.data);

  if (error) {
      console.error("ERROR DE SUPABASE:", error);
      throw new Error(`No se pudo guardar: ${error.message}`);
  }

  revalidatePath('/admin/products');
  // Redirigimos a la lista para evitar errores 404
  redirect('/admin/products'); 
}

// --- ACCIÓN: ACTUALIZAR PRODUCTO ---
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
    const primerError = validation.error.issues[0];
    throw new Error(`Error en ${String(primerError.path[0])}: ${primerError.message}`);
  }

  const supabase = await getSupabase();
  
  const { error } = await supabase.from('productos').update(validation.data).eq('id', productId);
  if (error) {
    console.error("ERROR DE SUPABASE:", error);
    throw new Error(`No se pudo actualizar el producto.`);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

// --- ACCIÓN: ELIMINAR PRODUCTO ---
export async function deleteProduct(productId: number) {
  const supabase = await getSupabase();
  
  const { error } = await supabase.from('productos').delete().eq('id', productId);
  if (error) {
    console.error('Error al eliminar producto:', error);
    throw new Error('No se pudo eliminar el producto.');
  }
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

// --- ACCIÓN: ESTADO DE ÓRDENES ---
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = await getSupabase();
  
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error('Error al actualizar orden:', error);
    throw new Error('No se pudo actualizar la orden.');
  }

  revalidatePath('/admin/orders');
  redirect('/admin/orders');
}

// --- CARACTERÍSTICAS ---
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
    console.error("ERROR CARACTERÍSTICA:", validation.error.flatten().fieldErrors);
    throw new Error(`Datos inválidos: ${validation.error.issues[0].message}`);
  }

  const supabase = await getSupabase();

  const { error } = await supabase.from('caracteristicas').insert(validation.data);

  if (error) {
    console.error("ERROR SUPABASE CARACTERÍSTICA:", error);
    throw new Error('No se pudo guardar la característica.');
  }

  revalidatePath('/admin/products');
}

export async function deleteCaracteristica(caracteristicaId: number, productoId: number) {
  const supabase = await getSupabase();
  
  const { error } = await supabase.from('caracteristicas').delete().eq('id', caracteristicaId);

  if (error) {
    console.error('Error eliminando característica:', error);
    throw new Error('No se pudo eliminar.');
  }

  revalidatePath('/admin/products');
}
