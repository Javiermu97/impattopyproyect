'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FAQ.module.css';

const faqs = [
  { q: '¿CÓMO REALIZO EL PAGO?', a: 'Aceptamos pago contra entrega: abonás al recibir tu paquete.' },
  { q: '¿TIENEN TIENDA FÍSICA?', a: 'Somos tienda online. Entregamos a todo el país.' },
  { q: '¿LOS PRODUCTOS SON NUEVOS?', a: 'Sí, todos son nuevos y con garantía del proveedor.' },
  { q: '¿QUÉ PASA SI EL PRODUCTO LLEGA DEFECTUOSO?', 
    a: 'Escribinos en 48 h con fotos y gestionamos cambio/devolución según política.' },
  { q: '¿HACEN ENVÍOS A MI CIUDAD?', 
    a: 'Sí, realizamos envíos a todo Paraguay.' },
  { q: '¿CUÁNTO TARDAN LOS PEDIDOS EN LLEGAR?', 
    a: `El plazo de entrega para Asunción y Gran Asunción es de 24 a 48 horas. Para el interior del país, el mismo es de 48 a 96 horas. Al completar tus datos de envío en la pantalla de pago, vas a encontrar información más detallada sobre las opciones de envío disponibles.

Todos los plazos propuestos de entrega de los productos son siempre estimativos pudiendo verificarse demoras en la entrega del producto sin que ello acarree responsabilidad alguna a PAP. El usuario será informado de los motivos de esta demora si es que ocurre y así lo requiere.`,
  },
  { q: '¿QUÉ GARANTÍA TIENEN LOS PRODUCTOS?', 
    a: `La garantía del producto es de hasta 5 (Cinco) días desde la entrega del mismo. Dentro de ese plazo, el usuario puede contactarse con nosotros al impattopy@gmail.com`,},
  {
    q: 'MI PEDIDO LLEGÓ EN MALAS CONDICIONES ¿QUÉ HAGO?',
    a: `En el caso de que su pedido haya llegado en malas condiciones, el usuario debe contactarse con nosotros por los mismos medios dentro de los primeros 5 días desde la recepción del producto.

Nos encargamos de solicitar a PAP el retiro del producto a devolver desde la dirección que nos indique el cliente. El costo de la devolución del producto corre por cuenta del cliente, que debe pagar por el envío a PAP cuando este haga el retiro del mismo.`,
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className={`shop-container ${styles.page}`}>
      <h1 className={`section-title ${styles.header}`}>Preguntas Frecuentes</h1>
      <p className={styles.subtitle}>
        A continuación figuran algunas de las preguntas más frecuentes sobre los pedidos.
      </p>

      <div className={styles.faqList}>
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={styles.item}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={styles.questionBtn}
              >
                <span>{item.q}</span>
                <span aria-hidden="true" className={styles.icon}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}>
                {item.a.split('\n').map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <section className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>¿No encontraste tu respuesta?</h3>
        <p className={styles.ctaText}>No dudes en ponerte en contacto con nosotros</p>
        <Link
          href="https://wa.me/595983491155"  /* reemplazá por tu número */
          target="_blank"
          className={styles.ctaBtn}
        >
          Contactanos
        </Link>
      </section>
    </main>
  );
}


