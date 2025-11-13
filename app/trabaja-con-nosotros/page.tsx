'use client';

import styles from './Jobs.module.css';

export default function JobsPage() {
  return (
    <main className={`shop-container ${styles.page}`}>
      <h1 className={`section-title ${styles.title}`}>Trabaja con nosotros</h1>

      <div className={styles.content}>
        <p className={styles.lead}>
          El comercio electrónico cambia las reglas del juego constantemente y propone, todos los días,
          nuevos desafíos. Todas nuestras unidades de negocio requieren del mejor talento. Buscamos
          personas que sean capaces de asumir el reto, para sumarlas a <strong>Impatto</strong>.
        </p>

        <p className={styles.ctaText}>
          Envíanos tu currículum a <a href="mailto:impattopy@gmail.com">impattopy@gmail.com</a>
        </p>

        <a href="impattopy@gmail.com" className={styles.ctaBtn}>
         
        </a>
      </div>
    </main>
  );
}
