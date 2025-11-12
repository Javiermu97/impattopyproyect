'use client';

import styles from './Privacy.module.css';

export default function PrivacyPage() {
  return (
    <main className={`shop-container ${styles.page}`}>
      <h1 className={`section-title ${styles.title}`}>
        Política de Privacidad de Impatto
      </h1>

      <div className={styles.content}>
        <p>
          Esta Política de privacidad describe cómo se recopila, utiliza y
          comparte su información personal cuando visita o hace una compra en
          <strong> impatto.com.py</strong> (denominado en lo sucesivo el “Sitio”).
        </p>

        <h2>INFORMACIÓN PERSONAL QUE RECOPILAMOS</h2>
        <p>
          Cuando visita el Sitio, recopilamos automáticamente cierta
          información sobre su dispositivo, incluida información sobre su
          navegador web, dirección IP, zona horaria y algunas de las cookies
          que están instaladas en su dispositivo. Además, a medida que navega
          por el Sitio, recopilamos información sobre las páginas web
          individuales o los productos que ve, las páginas web o los términos
          de búsqueda que lo remitieron al Sitio e información sobre cómo
          interactúa usted con el Sitio. Nos referimos a esta información
          recopilada automáticamente como <em>“Información del dispositivo”</em>.
        </p>

        <p>Recopilamos Información del dispositivo mediante el uso de las siguientes tecnologías:</p>

        <h3>COOKIES</h3>
        <p>
          Aquí tienes una lista de cookies que utilizamos. Las enlistamos para
          que puedas elegir si quieres optar por quitarlas o no.
        </p>
        <ul className={styles.list}>
          <li>
            <code>_session_id</code>, unique token, sessional — Allows Shopify to
            store information about your session (referrer, landing page, etc).
          </li>
          <li>
            <code>_shopify_visit</code>, no data held, Persistent for 30 minutes
            from the last visit — Used by our website provider’s internal stats
            tracker to record the number of visits.
          </li>
          <li>
            <code>_shopify_uniq</code>, no data held, expires midnight (relative
            to the visitor) of the next day — Counts the number of visits to a
            store by a single customer.
          </li>
          <li>
            <code>cart</code>, unique token, persistent for 2 weeks — Stores
            information about the contents of your cart.
          </li>
          <li><code>_secure_session_id</code>, unique token, sessional.</li>
          <li>
            <code>storefront_digest</code>, unique token, indefinite — If the
            shop has a password, this is used to determine if the current
            visitor has access.
          </li>
        </ul>

        <ul className={styles.list}>
          <li>
            Los “Archivos de registro” rastrean las acciones que ocurren en el
            Sitio y recopilan datos, incluyendo su dirección IP, tipo de
            navegador, proveedor de servicio de Internet, páginas de
            referencia/salida y marcas de fecha/horario.
          </li>
          <li>
            Las “balizas web”, las “etiquetas” y los “píxeles” son archivos
            electrónicos utilizados para registrar información sobre cómo navega
            usted por el Sitio. <strong>[[] INSERTAR DESCRIPCIONES DE OTROS
            TIPOS DE TECNOLOGÍAS DE SEGUIMIENTO QUE SE UTILICEN ]]</strong>
          </li>
        </ul>

        <p>
          Además, cuando hace una compra o intenta hacer una compra a través
          del Sitio, recopilamos cierta información de usted, entre la que se
          incluye su nombre, dirección de facturación, dirección de envío,
          información de pago (incluidos los números de la tarjeta de crédito
          <strong> [[INSERTAR CUALQUIER OTRO TIPO DE PAGO ACEPTADO]]</strong>),
          dirección de correo electrónico y número de teléfono. Nos referimos a
          esta información como <em>“Información del pedido”</em>.
        </p>

        <p>
          <strong>[[ INSERTAR CUALQUIER OTRA INFORMACIÓN QUE USTED RECOPILA:
          DATOS SIN CONEXIÓN, LISTAS/DATOS DE MARKETING ADQUIRIDOS ]]</strong>
        </p>

        <p>
          Cuando hablamos de “Información personal” en la presente Política de
          privacidad, nos referimos tanto a la Información del dispositivo como
          a la Información del pedido.
        </p>

        <h2>¿CÓMO UTILIZAMOS SU INFORMACIÓN PERSONAL?</h2>
        <p>
          Usamos la Información del pedido que recopilamos en general para
          preparar los pedidos realizados a través del Sitio (incluido el
          procesamiento de su información de pago, la organización de los
          envíos y la entrega de facturas y/o confirmaciones de pedido).
          Además, utilizamos esta Información del pedido para: comunicarnos con
          usted; examinar nuestros pedidos en busca de fraudes o riesgos
          potenciales; y, cuando de acuerdo con las preferencias que usted
          compartió con nosotros, proporcionarle información o publicidad
          relacionada con nuestros productos o servicios.
          <strong> [[INSERTAR OTROS USOS DE INFORMACIÓN DEL PEDIDO]]</strong>
        </p>
        <p>
          Utilizamos la Información del dispositivo que recopilamos para
          ayudarnos a detectar posibles riesgos y fraudes (en particular, su
          dirección IP) y, en general, para mejorar y optimizar nuestro Sitio
          (por ejemplo, al generar informes y estadísticas sobre cómo nuestros
          clientes navegan e interactúan con el Sitio y para evaluar el éxito
          de nuestras campañas publicitarias y de marketing).
          <strong> [[INSERTAR OTROS USOS DE INFORMACIÓN DEL DISPOSITIVO,
          INCLUIDOS PUBLICIDAD/RETARGETING]]</strong>
        </p>

        <h2>COMPARTIR SU INFORMACIÓN PERSONAL</h2>
        <p>
          Compartimos su Información personal con terceros para que nos ayuden
          a utilizarla tal como se describió anteriormente. Por ejemplo,
          utilizamos la tecnología de Shopify en nuestra tienda online (ver su
          política de privacidad). También utilizamos Google Analytics para
          comprender cómo usan nuestros clientes el Sitio. Puede darse de baja
          de Google Analytics en{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">
            este enlace
          </a>.
        </p>
        <p>
          Finalmente, también podemos compartir su Información personal para
          cumplir con las leyes y regulaciones aplicables, para responder a una
          citación u otra solicitud legal de información que recibamos, o para
          proteger nuestros derechos.
          <strong> [[ INCLUIR SI SE USA REMARKETING O PUBLICIDAD DIRIGIDA ]]</strong>
        </p>

        <h3>PUBLICIDAD ORIENTADA POR EL COMPORTAMIENTO</h3>
        <p>
          Como se describió anteriormente, utilizamos su Información personal
          para proporcionarle anuncios publicitarios dirigidos o comunicaciones
          de marketing que creemos que pueden ser de su interés. Para más
          información sobre cómo funciona la publicidad dirigida, visite la
          página educativa de la NAI.
        </p>
        <p>
          Puede darse de baja de la publicidad dirigida mediante los siguientes
          enlaces:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>[[ INCLUIR ENLACES ESPECÍFICOS QUE UTILICES ]]</strong>
          </li>
          <li>
            Facebook:{' '}
            <a
              href="https://www.facebook.com/settings/?tab=ads"
              target="_blank"
            >
              https://www.facebook.com/settings/?tab=ads
            </a>
          </li>
          <li>
            Google:{' '}
            <a
              href="https://adssettings.google.com/authenticated?hl=es"
              target="_blank"
            >
              https://adssettings.google.com/authenticated?hl=es
            </a>
          </li>
          <li>
            Bing:{' '}
            <a
              href="https://about.ads.microsoft.com/es-es/recursos/directivas/anuncios-personalizados"
              target="_blank"
            >
              https://about.ads.microsoft.com/es-es/recursos/directivas/anuncios-personalizados
            </a>
          </li>
        </ul>
        <p>
          Además, puede darse de baja de algunos de estos servicios visitando el
          portal de exclusión voluntaria de Digital Advertising Alliance en:{' '}
          <a href="http://optout.aboutads.info/" target="_blank">
            http://optout.aboutads.info/
          </a>.
        </p>

        <h2>NO RASTREAR</h2>
        <p>
          Tenga en cuenta que no alteramos las prácticas de recopilación y uso
          de datos de nuestro Sitio cuando vemos una señal de “No rastrear”
          desde su navegador.
        </p>

        <h2>SUS DERECHOS</h2>
        <p>
          Si usted es un residente europeo, tiene derecho a acceder a la
          información personal que tenemos sobre usted y a solicitar que su
          información personal sea corregida, actualizada o eliminada. Si desea
          ejercer este derecho, comuníquese con nosotros a través de la
          información de contacto que se encuentra a continuación. Además,
          tenga en cuenta que su información se transferirá fuera de Europa,
          incluidos Canadá y los Estados Unidos.
        </p>

        <h2>RETENCIÓN DE DATOS</h2>
        <p>
          Cuando realiza un pedido a través del Sitio, mantendremos su
          Información del pedido para nuestros registros a menos que y hasta que
          nos pida que eliminemos esta información.
        </p>

        <h2>CAMBIOS</h2>
        <p>
          Podemos actualizar esta política de privacidad periódicamente para
          reflejar cambios en nuestras prácticas o por otros motivos operativos,
          legales o reglamentarios.
        </p>

        <h2>CONTÁCTENOS</h2>
        <p>
          Para obtener más información sobre nuestras prácticas de privacidad,
          si tiene alguna pregunta o si desea presentar una queja, contáctenos
          por correo electrónico a <strong>impattopy@gmail.com</strong>.
        </p>
      </div>
    </main>
  );
}
