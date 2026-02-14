import { supabase } from './supabaseClient';
import { Product } from './types';
import { transformProduct, transformProducts } from './imageUtils';

// Función para obtener TODOS los productos
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('productos').select('*');
  
  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
  return transformProducts(data) as Product[];
}

// Función para obtener UN producto por su ID, incluyendo sus características
export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('productos')
    .select('*, caracteristicas (*)')
    .eq('id', id)
    .order('orden', { referencedTable: 'caracteristicas', ascending: true })
    .single();

  if (error) {
    console.error('Error al obtener producto por ID:', error);
    return null;
  }
  return transformProduct(data) as Product;
}