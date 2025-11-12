'use client';

import styles from './Guarantee.module.css';

export default function GuaranteePage() {
  return (
    <main className={`shop-container ${styles.page}`}>
      <h1 className={`section-title ${styles.title}`}>Garantía &amp; Devoluciones</h1>

      <div className={styles.content}>
        <p>
          La garantía del producto es de hasta <strong>5 (cinco) días calendario</strong> desde la
          entrega del mismo (solo por defectos de fábrica o averías en el transporte). Dentro de ese
          plazo, el usuario puede contactarse con nosotros al <strong>+595 98314342</strong> o al
          correo <strong>contacto@arcashop.com.py</strong> para hacer sus reclamos y/o solicitar el
          cambio de su producto y, en el caso de no contar con stock del producto, la devolución de
          su dinero, según lo dicta la Ley del Comercio Electrónico.
        </p>

        <p>
          En el caso de que su pedido haya llegado en malas condiciones o con averías de fábrica, el
          usuario deberá contactarse con nosotros y remitir las pruebas correspondientes de la
          avería en un <strong>video explicativo</strong> por los mismos medios dentro de los
          primeros 5 días (calendario) desde la recepción del producto para que nuestro equipo pueda
          analizar la veracidad de la información.
        </p>

        <p>
          Solo en el caso de que la avería sea confirmada como de fábrica o de transporte,
          <strong> ArcaShop</strong> se encargará de solicitar a su proveedor de envíos el retiro
          del producto en no más de <strong>10 días hábiles</strong> desde la dirección que el
          cliente indique hasta nuestro depósito para efectuar el reemplazo del producto averiado.
          En este caso específico, el costo de los envíos para devolver el producto corre por cuenta
          de <strong>ArcaShop</strong>.
        </p>

        <p>
          En el caso que el cliente solicite una devolución o cambio de un producto sin averías de
          fábrica o daños de transporte confirmados por el equipo de ArcaShop a través del video y
          en los tiempos arriba estipulados, los envíos correrán por cuenta del cliente. Y el
          reemplazo del producto estará sujeto a la revisión del equipo de ArcaShop que debe pagar
          por el envío a PAP cuando este haga el retiro del mismo.
        </p>

        <h2>No se aceptan devoluciones de:</h2>
        <ul className={styles.list}>
          <li>Compras que hayan sido entregadas al cliente hace más de 5 (cinco) días.</li>
          <li>Productos que no fueron adquiridos a través de la página web de ArcaShop.</li>
          <li>Productos que fueron adquiridos en rebajas (Descuentos).</li>
          <li>Productos de uso íntimo (ropa interior, bikinis).</li>
          <li>Accesorios.</li>
          <li>Productos adquiridos de categorías Last Sale, Hot Sale, Final Sale y otras a comunicar.</li>
        </ul>

        <h2>Para agilizar el proceso, adjuntá estas fotografías en tu solicitud:</h2>
        <ul className={styles.list}>
          <li>
            Fotografía(s) de la <strong>caja recibida</strong>. Si el packaging presenta signos de
            posibles daños durante el transporte, incluir fotografías que lo demuestren.
          </li>
          <li>
            Fotografía de la <strong>etiqueta del transportista</strong> (pegada en la caja o dentro
            de la bolsa entregada por ArcaShop).
          </li>
          <li>
            Fotografía(s) del <strong>producto</strong> donde se aprecie claramente la incidencia.
          </li>
        </ul>

        <p>
          Una vez llegado el producto a nuestras manos, <strong>revisaremos</strong> el artículo para
          verificar la calidad y el estado del mismo.
        </p>

        <p>
          En todos los casos se deberá conservar y presentar el <strong>ticket de compra</strong> o
          <strong> remito de entrega</strong>. Estos requisitos son indispensables.
        </p>

        <p>
          Te informamos que, en caso de recibir un producto que realmente <strong>no</strong> está en
          mal estado o que <strong>no corresponde</strong> con el producto que habías pedido, el
          reclamo <strong>no</strong> será aceptado.
        </p>

        <p>
          Si el producto es aceptado, concluimos la devolución <strong>reintegrando</strong> al
          cliente el monto correspondiente mediante una <strong>transferencia bancaria</strong>.
        </p>
      </div>
    </main>
  );
}
