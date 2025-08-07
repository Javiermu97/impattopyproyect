export const revalidate = 50; // Revalida cada 300 segundos (5 minutos)
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
    .limit(4);

  // 2. Obtenemos los productos destacados para "Hechos para tu hogar"
  const { data: destacadosHogar, error: errorHogar } = await supabase
    .from('productos')
    .select('*')
    .eq('es_destacado_hogar', true) // Buscamos los productos que marcaste
    .limit(8);

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

      {/* Sección "Especial de la Semana" con datos elegidos por ti */}
      <section className="products-section products-section-gray">
        <h2 className="section-title">🔥Especial de la Semana <span role="img" aria-label="fire">🔥</span></h2>
        <div className="product-grid-shop columns-4">
          {destacadosSemana?.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
              <div className="shop-product-card">
                <div className="image-container">
                  {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                  <Image src={product.imageUrl} alt={product.name} width={250} height={250} className="shop-product-image-primary" style={{ objectFit: 'contain' }} />
                  {product.imageUrl2 && <Image src={product.imageUrl2} alt={product.name} width={250} height={250} className="shop-product-image-secondary" style={{ objectFit: 'contain' }} />}
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

      {/* Sección "Hechos para tu hogar" con datos elegidos por ti */}
      <section className="products-section">
        <h2 className="section-title">Confort y Diseño</h2>
        <h3 className="section-subtitle"> Hechos para tu hogar <span role="img" aria-label="house">🏠</span></h3>
        <div className="product-grid-shop columns-4">
          {destacadosHogar?.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
              <div className="shop-product-card">
                <div className="image-container">
                  {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                  <Image src={product.imageUrl} alt={product.name} width={250} height={250} className="shop-product-image-primary" style={{ objectFit: 'contain' }} />
                  {product.imageUrl2 && <Image src={product.imageUrl2} alt={product.name} width={250} height={250} className="shop-product-image-secondary" style={{ objectFit: 'contain' }} />}
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

      <section className="philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-image-container">
            <Image src="/filosofia-1.jpg" alt="Mujer trabajando en un mostrador" width={450} height={300} className="philosophy-img philosophy-img-bg" />
            <Image src="/filosofia-2.jpg" alt="Personas revisando un catálogo" width={450} height={300} className="philosophy-img philosophy-img-fg" />
          </div>
          <div className="philosophy-content">
            <p className="philosophy-pre-title">IMPATTO PY</p>
            <h2>Nuestra Filosofía</h2>
            <p>Es brindar la mejor experiencia a nuestra comunidad...</p>
            <p><strong>Más de 20mil clientes Paraguayos confiaron en nosotros...</strong></p>
            <button className="btn-primary">CONÓCENOS</button>
          </div>
        </div>
      </section>

      <InfoBanner />

      <a href="https://wa.me/595983491155" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
        <FaWhatsapp size={22} />
        Contáctanos
      </a>
    </>
  );
}