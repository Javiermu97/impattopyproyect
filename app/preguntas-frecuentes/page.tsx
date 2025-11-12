'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FAQ.module.css';

const faqs = [
  { q: '¿CÓMO REALIZO EL PAGO?', a: 'Aceptamos pago contra entrega: abonás al recibir tu paquete.' },
  { q: '¿TIENEN TIENDA FÍSICA?', a: 'Somos tienda online. Entregamos a todo el país.' },
  { q: '¿LOS PRODUCTOS SON NUEVOS?', a: 'Sí, todos son nuevos y con garantía del proveedor.' },
  { q: '¿QUÉ PASA SI EL PRODUCTO LLEGA DEFECTUOSO?', a: 'Escribinos en 48 h con fotos y gestionamos cambio/devolución según política.' },
  { q: '¿HACEN ENVÍOS A MI CIUDAD?', a: 'Sí, realizamos envíos a todo Paraguay.' },
  { q: '¿CUÁNTO TARDAN LOS PEDIDOS EN LLEGAR?', a: 'Entre 24 y 72 h hábiles según zona y disponibilidad.' },
  { q: '¿QUÉ GARANTÍA TIENEN LOS PRODUCTOS?', a: 'La garantía depende del fabricante/proveedor. Conservá tu comprobante.' },
  { q: 'MI PEDIDO LLEGÓ EN MALAS CONDICIONES ¿QUÉ HAGO?', a: 'Tomá fotos del paquete/producto y escribinos para resolverlo.' },
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
                <span
                  aria-hidden="true"
                  className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
                >
                  +
                </span>
              </button>

              <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}>
                {item.a}
              </div>
            </div>
          );
        })}
      </div>

      <section className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>¿No encontraste tu respuesta?</h3>
        <p className={styles.ctaText}>No dudes en ponerte en contacto con nosotros</p>
        <Link
          href="https://wa.me/595XXXXXXXXX"  /* reemplazá por tu número */
          target="_blank"
          className={styles.ctaBtn}
        >
          Contactanos
        </Link>
      </section>
    </main>
  );
}

