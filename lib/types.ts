// lib/types.ts

export interface Feature {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  producto_id: number;
}

export interface ProductVariant {
  color: string;
  colorHex: string;
  image: string;
}

export interface Product {
  // Propiedades que vienen de Supabase
  id: number;
  created_at: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  texto_oferta?: string; // <-- AÑADE ESTA LÍNEA
  // Propiedades de tu archivo `data.ts` que pueden no estar en Supabase (las hacemos opcionales)
  oldPrice?: number;
  inStock?: boolean;
  dateAdded?: Date; // Propiedad antigua
  imageUrl2?: string;
  galleryImages?: string[];
  variants?: ProductVariant[];
  promoSubtitle?: string;
  videoUrl?: string;
  
  // Relación con las características
  caracteristicas: Feature[];
}