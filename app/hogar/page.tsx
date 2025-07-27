import { allProducts, Product } from '@/lib/data'; // Asumiendo que tus productos vienen de aquí
import ShopPageClient from '@/app/components/ShopPageClient'; // Importamos el nuevo componente maestro

export const metadata = {
  title: 'Hogar - Impatto Py',
  description: 'Encuentra todo lo que necesitas para tu hogar y cocina.',
};

export default function HogarPage() {
  // 1. Pre-filtramos los productos para esta categoría en el servidor
  const keywords = ['Organizador', 'Licuadora', 'Alfombra', 'Cinta', 'Lint'];
  const hogarProducts = allProducts
    .filter((p: Product) => keywords.some(key => p.name.includes(key)));

  // 2. Pasamos solo esa lista de productos al componente de cliente
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