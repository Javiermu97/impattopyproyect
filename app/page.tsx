export const revalidate = 50;
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import CarruselInferior from './components/CarruselInferior';
import InfoBanner from './components/InfoBanner';
import BannerCuotas from './components/BannerCuotas';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import { transformProducts } from '@/lib/imageUtils';
import ProductCard from './components/ProductCard';

export default async function HomePage() {

  const { data: destacadosSemana, error: errorSemana } = await supabase
    .from('productos')
    .select('*')
    .eq('es_destacado_semana', true)
    .limit(20);

  const { data: destacadosHogar, error: errorHogar } = await supabase
    .from('productos')
    .select('*')
    .eq('es_destacado_hogar', true)
    .limit(20);

  if (errorSemana) console.error('Error al cargar productos destacados de la semana:', errorSemana);
  if (errorHogar) console.error('Error al cargar productos destacados de hogar:', errorHogar);

  const transformedDestacadosSemana = transformProducts(destacadosSemana || []);
  const transformedDestacadosHogar = transformProducts(destacadosHogar || []);

  return (
    <>
      <CarruselInferior />

      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/videos/quita-pelusas.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        <div className="hero-content">
          <h2>DESCUBRÍ LO QUE TE ENCANTA</h2>
          <h1>Miles de productos seleccionados para vos</h1>
          <p>Elegí entre productos modernos, prácticos y funcionales</p>
          <Link href="/mas-vendidos">
            <button className="btn-primary">EXPLORAR</button>
          </Link>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* ===== SECCIÓN "ESPECIAL DE LA SEMANA" ===== */}
      {/* ==================================================================== */}
      <section className="home-products-section">
        <h2 className="section-title"> Especial de la Semana </h2>
        <div className="product-grid-shop columns-3">
          {transformedDestacadosSemana?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link href="/mas-vendidos">
          <button className="btn-secondary">VER TODOS</button>
        </Link>
      </section>

      {/* ==================================================================== */}
      {/* ===== BANNER DESPLAZABLE DE MEDIOS DE PAGO Y CUOTAS ===== */}
      {/* ==================================================================== */}
      <BannerCuotas />

      {/* ==================================================================== */}
      {/* ===== SECCIÓN "HECHOS PARA TU HOGAR" ===== */}
      {/* ==================================================================== */}
      <section className="home-products-section reducir-espacio-superior">
        <h2 className="section-title">Confort y Diseño</h2>
        <h3 className="section-subtitle">Hechos para tu hogar</h3>
        <div className="product-grid-shop columns-3">
          {transformedDestacadosHogar?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link href="/hogar">
          <button className="btn-secondary">VER TODOS</button>
        </Link>
      </section>

      <InfoBanner />

      <a href="https://wa.me/595983491155" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
        <FaWhatsapp size={22} />
        Contáctanos
      </a>
    </>
  );
}