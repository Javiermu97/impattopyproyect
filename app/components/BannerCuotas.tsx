'use client';

import { useEffect, useRef } from 'react';

const bancos = [
  { nombre: 'Visa', color: '#1A1F71', texto: '#FFFFFF' },
  { nombre: 'Mastercard', color: '#EB001B', texto: '#FFFFFF' },
  { nombre: 'Tigo Money', color: '#00377A', texto: '#FFFFFF' },
  { nombre: 'Personal Pay', color: '#E4002B', texto: '#FFFFFF' },
  { nombre: 'Giros Claro', color: '#DA291C', texto: '#FFFFFF' },
  { nombre: 'Wally', color: '#6C3CE1', texto: '#FFFFFF' },
  { nombre: 'Zimple', color: '#00B140', texto: '#FFFFFF' },
  { nombre: 'Pago QR', color: '#003087', texto: '#FFFFFF' },
  { nombre: 'Wepa', color: '#F5A623', texto: '#FFFFFF' },
  { nombre: 'Aquí Pago', color: '#E31837', texto: '#FFFFFF' },
  { nombre: 'Pago Express', color: '#FF6600', texto: '#FFFFFF' },
  { nombre: 'Banco GNB', color: '#004A97', texto: '#FFFFFF' },
  { nombre: 'Banco Familiar', color: '#00843D', texto: '#FFFFFF' },
  { nombre: 'BNF', color: '#003087', texto: '#FFFFFF' },
  { nombre: 'Banco Atlas', color: '#C8102E', texto: '#FFFFFF' },
];

export default function BannerCuotas() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const speed = 0.5;
    const half = track.scrollWidth / 2;
    const animate = () => {
      pos += speed;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...bancos, ...bancos]; // duplicamos para loop infinito

  return (
    <div className="banner-cuotas-wrapper">
      <span className="banner-cuotas-label">Comprá en cuotas sin intereses</span>
      <div className="banner-cuotas-scroll">
        <div className="banner-cuotas-track" ref={trackRef}>
          {items.map((banco, i) => (
            <div
              key={i}
              className="banner-cuota-item"
              style={{ backgroundColor: banco.color, color: banco.texto }}
            >
              {banco.nombre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}