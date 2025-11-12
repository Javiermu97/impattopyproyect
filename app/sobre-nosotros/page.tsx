import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// Metadatos para el SEO de la página (reemplaza al <Head> de antes)
export const metadata: Metadata = {
  title: 'Nuestra Historia | Impatto Boutique',
  description: 'Descubre la historia de Impatto Boutique, nuestra misión y la pasión por ofrecer productos de calidad para tu hogar en Paraguay.',
};

export default function SobreNosotrosPage() {
  return (
    // Usamos un contenedor simple para la página
    <div style={{ padding: '2rem 1rem', backgroundColor: '#fff' }}>

      {/* Título y descripción principal */}
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' }}>
          Impatto: Innovación, Calidad y Pasión por tu Hogar
        </h1>
        <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.7' }}>
          La historia de Impatto es la visión de un joven emprendedor que soñó con transformar los hogares y la vida de las personas en Paraguay. Guiado por la convicción de que cada espacio merece ser un reflejo de bienestar y buen gusto, fundó este proyecto con un valor fundamental: <strong>ofrecer soluciones excepcionales que inspiren y mejoren tu día a día.</strong>
        </p>
      </div>

      {/* Reutilizamos la sección de Filosofía con las imágenes */}
      <section className="philosophy-section" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="philosophy-container">
          <div className="philosophy-image-container">
            {/* Asegúrate de que las rutas a las imágenes sean correctas desde tu carpeta 'public' */}
            <Image 
              src="/filosofia-1.jpg" 
              alt="Personas revisando un catálogo" 
              width={450} 
              height={300} 
              className="philosophy-img philosophy-img-bg" 
            />
            <Image 
              src="/filosofia-2.jpg" 
              alt="Mujer trabajando en un mostrador" 
              width={450} 
              height={300} 
              className="philosophy-img philosophy-img-fg" 
            />
          </div>
          <div className="philosophy-content">
            <p className="philosophy-pre-title">NUESTRA MISIÓN</p>
            <h2>Más allá de la venta</h2>
            <p>
              Buscamos ser ese aliado que te ayuda a crear ambientes llenos de armonía, funcionalidad y estilo. Nos apasiona presentarte tendencias innovadoras y soluciones prácticas que se adapten perfectamente a tus necesidades y a la personalidad única de tu hogar.
            </p>
            <p>
              <strong>Más de 20mil clientes Paraguayos confiaron en nosotros...</strong> y seguimos comprometidos en dar lo mejor para ellos. ¡Muchas gracias!
            </p>
          </div>
        </div>
      </section>

      {/* Sección final con más texto */}
      <div style={{ maxWidth: '900px', margin: '4rem auto 2rem auto', textAlign: 'center' }}>
         <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.7' }}>
            Al elegir Impatto, no solo adquieres un producto; te unes a una comunidad que valora la excelencia y el diseño. Estamos aquí para proveer, ayudar y presentar lo mejor, porque tu felicidad y la de tu hogar son nuestra mayor recompensa.
        </p>
        <Link href="/tienda">
            <button className="btn-primary" style={{marginTop: '2rem'}}>Explorar la Tienda</button>
        </Link>
      </div>

    </div>
  );
}