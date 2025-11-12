// app/components/SearchModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 👈 Agregar esto
import styles from './SearchModal.module.css';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // 👈 Inicializamos el router

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // evita búsquedas vacías
    router.push(`/buscar?q=${encodeURIComponent(searchTerm)}`); // 👈 navegación real
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Buscar</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Cerrar búsqueda">
            <IoCloseOutline size={30} />
          </button>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              id="search-input"
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              autoComplete="off"
            />
            <button type="submit" className={styles.searchBtn} aria-label="Buscar">
              <IoSearchOutline size={24} />
            </button>
          </form>

          <div className={styles.suggestions}>
            {/* Aquí puedes añadir sugerencias o búsquedas recientes */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
