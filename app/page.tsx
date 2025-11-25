export const revalidate = 50; // Revalida cada 50 segundos
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import CarruselInferior from './components/CarruselInferior';
import InfoBanner from './components/InfoBanner';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';

export default async function HomePage() {

  // 1. Obtenemos los productos destacados para "Especial de la Semana"
  const { data: destacadosSemana, error: errorSemana } = await supabase
    .from('productos')
    .select('*')
    .eq('es_destacado_semana', true) // Buscamos los productos que marcaste
    .limit(20);

  // 2. Obtenemos los productos destacados para "Hechos para tu hogar"
  const { data: destacadosHogar, error: errorHogar } = await supabase
    .from('productos')
    .select('*')
    .eq('es_destacado_hogar', true) // Buscamos los productos que marcaste
    .limit(20);

  if (errorSemana) console.error('Error al cargar productos destacados de la semana:', errorSemana);
  if (errorHogar) console.error('Error al cargar productos destacados de hogar:', errorHogar);

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
          <Link href="/tienda">
            <button className="btn-primary">EXPLORAR</button>
          </Link>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* ===== SECCIÓN "ESPECIAL DE LA SEMANA" (ANCHO COMPLETO) ===== */}
      {/* ==================================================================== */}
      <section className="home-products-section">
        <h2 className="section-title"> Especial de la Semana </h2>
        {/* Usamos 'columns-3' para la cuadrícula */}
        <div className="product-grid-shop columns-3">
          {destacadosSemana?.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
              <div className="shop-product-card">
                <div className="image-container">
                  {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="shop-product-image-primary" 
                  />
                  {product.imageUrl2 && (
                    <Image 
                      src={product.imageUrl2} 
                      alt={product.name} 
                      fill 
                      className="shop-product-image-secondary" 
                    />
                  )}
                </div>
                <h4>{product.name}</h4>
                <div className="price-section">
                  <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
                  {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/mas-vendidos">
          <button className="btn-secondary">VER TODOS</button>
        </Link>
      </section>

      {/* ==================================================================== */}
      {/* ===== SECCIÓN "HECHOS PARA TU HOGAR" (CORREGIDA) ===== */}
      {/* ==================================================================== */}
      <section className="home-products-section reducir-espacio-superior">
        <h2 className="section-title">Confort y Diseño</h2>
        <h3 className="section-subtitle">Hechos para tu hogar</h3>
        <div className="product-grid-shop columns-3">
          {destacadosHogar?.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
              <div className="shop-product-card">
                <div className="image-container">
                  {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill
                    className="shop-product-image-primary"
                  />
                  {product.imageUrl2 && (
                    <Image 
                      src={product.imageUrl2} 
                      alt={product.name} 
                      fill
                      className="shop-product-image-secondary"
                    />
                  )}
                </div>
                <h4>{product.name}</h4>
                <div className="price-section">
                  <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
                  {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
                </div>
              </div>
            </Link>
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