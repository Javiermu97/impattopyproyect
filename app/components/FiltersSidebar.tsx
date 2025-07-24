'use client';

import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

// Componente para una sección de filtro desplegable
const FilterGroup = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true); // Por defecto abiertos

  return (
    <div className="filter-group">
      <button className="filter-title" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`filter-chevron ${isOpen ? 'open' : ''}`}>›</span>
      </button>
      <div className={`filter-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};


const FiltersSidebar = () => {
  const [price, setPrice] = useState([0, 500000]);

  return (
    <aside className="filters-sidebar">
      <h3 className="filter-title-main">TODO</h3>
      
      <FilterGroup title="AVAILABILITY">
        <div className="filter-option">
          <input type="checkbox" id="inStock" name="inStock" />
          <label htmlFor="inStock">En existencia (9)</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="outOfStock" name="outOfStock" />
          <label htmlFor="outOfStock">Agotado (3)</label>
        </div>
      </FilterGroup>

      <FilterGroup title="PRICE">
        <Slider.Root 
          className="SliderRoot" 
          defaultValue={[0, 500000]} 
          max={1000000} 
          step={10000} 
          onValueChange={(value) => setPrice(value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Precio mínimo" />
          <Slider.Thumb className="SliderThumb" aria-label="Precio máximo" />
        </Slider.Root>
        <div className="price-input-container">
          <div className="price-input-wrapper">
            <span>Gs.</span>
            <input className="price-input" value={price[0].toLocaleString('es-PY')} readOnly />
          </div>
          <div className="price-input-wrapper">
            <span>Gs.</span>
            <input className="price-input" value={price[1].toLocaleString('es-PY')} readOnly />
          </div>
        </div>
      </FilterGroup>
    </aside>
  );
};

export default FiltersSidebar;