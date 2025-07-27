import { supabase } from './supabaseClient';
import { Product } from './types'; // <-- AHORA IMPORTA EL TIPO DESDE types.ts

// Ya no necesitamos definir Product o Feature aquí

// Función para obtener TODOS los productos
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('productos').select('*');
  
  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
  return data as Product[];
}

// Función para obtener UN producto por su ID, incluyendo sus características
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('productos')
    .select('*, caracteristicas (*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener producto por ID:', error);
    return null;
  }
  return data as Product;
}