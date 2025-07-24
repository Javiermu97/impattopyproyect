// app/page.tsx

import { allProducts } from '@/lib/data'; // Asumiendo que tus productos vienen de aquí
import ShopPageClient from './components/ShopPageClient'; // Importamos el nuevo componente maestro

// Esta página ahora es un Componente de Servidor, mucho más rápido.
export default function HomePage() {
  // Simplemente pasamos la lista completa de productos al componente de cliente.
  return <ShopPageClient products={allProducts} />;
}