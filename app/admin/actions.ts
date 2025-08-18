'use server';

// ▼▼▼ IMPORTACIONES ▼▼▼
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- ACCIONES PARA ÓRDENES ---
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    // CAMBIO: Hacemos el log y el error más detallado
    console.error('Error en Server Action (updateOrderStatus):', error.message);
    throw new Error(`No se pudo actualizar la orden. Razón: ${error.message}`);
  }

  revalidatePath('/admin');
  return data;
}

// --- ACCIONES PARA PRODUCTOS ---
export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies });

  const newProduct = {
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    inStock: formData.get('inStock') === 'on',
  };

  const { error } = await supabase.from('products').insert(newProduct);

  if (error) {
    // CAMBIO: Hacemos el log y el error más detallado
    console.error('Error de Supabase al crear producto:', error.message);
    throw new Error(`No se pudo crear el producto. Razón: ${error.message}`);
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(productId: number, formData: FormData) {
  const supabase = createServerActionClient({ cookies });

  const updatedProduct = {
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    inStock: formData.get('inStock') === 'on',
  };

  const { error } = await supabase
    .from('products')
    .update(updatedProduct)
    .eq('id', productId);

  if (error) {
    // CAMBIO: Hacemos el log y el error más detallado
    console.error('Error al actualizar producto:', error.message);
    throw new Error(`No se pudo actualizar el producto. Razón: ${error.message}`);
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${productId}`);
  redirect('/admin/products');
}

export async function deleteProduct(productId: number) {
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    // CAMBIO: Hacemos el log y el error más detallado
    console.error('Error al eliminar producto:', error.message);
    throw new Error(`No se pudo eliminar el producto. Razón: ${error.message}`);
  }

  revalidatePath('/admin/products');
}

