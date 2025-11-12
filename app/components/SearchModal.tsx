// app/components/SearchModal.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './SearchModal.module.css';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Enfocar el input automáticamente cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      // Usamos un pequeño timeout para asegurar que el input sea visible antes de enfocarlo
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Manejar el envío de la búsqueda (por ahora solo imprime en consola)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm);
    // Aquí iría la lógica para navegar a la página de resultados
    // Por ejemplo: router.push(`/buscar?q=${searchTerm}`);
    onClose(); // Cierra el modal después de buscar
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay oscuro */}
      <div className={styles.overlay} onClick={onClose} />
      
      {/* Contenido del modal que se desliza */}
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
          
          {/* Aquí podrías mostrar sugerencias de búsqueda o productos populares */}
          <div className={styles.suggestions}>
            {/* Ejemplo: <p>Productos populares...</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;