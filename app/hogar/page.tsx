import { allProducts, Product } from '@/lib/data';
import ShopPageClient from '@/app/components/ShopPageClient'; // <-- RUTA CORREGIDA para consistencia

export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Encuentra todo lo que necesitas para tu hogar.',
};

export default function HogarPage() {
  // REVISA AQUÍ: Asegúrate de que los nombres de tus productos en `lib/data.ts`
  // contengan alguna de estas palabras (no importa si es mayúscula o minúscula).
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  
  const hogarProducts = allProducts
    .filter((p: Product) => 
      keywords.some(key => p.name.toLowerCase().includes(key.toLowerCase()))
    );

  return (
    <div className="shop-container">
        <header className="shop-header">
            <h1>Hogar</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Soluciones prácticas y novedosas para hacer tu vida más fácil.
            </p>
        </header>
        <ShopPageClient products={hogarProducts} />
    </div>
  );
}