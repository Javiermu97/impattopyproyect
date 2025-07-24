'use client';

import React, { useState } from 'react';

const FiltersSidebar = () => {
  // Aquí puedes añadir la lógica para manejar los filtros en el futuro
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

  const [price, setPrice] = useState([0, 500000]);

  return (
    <aside className="filters-sidebar">
      <h3 className="filter-title-main">Filtros</h3>
      
      {/* Filtro de Disponibilidad */}
      <div className="filter-group">
        <h4 className="filter-title">AVAILABILITY</h4>
        <div className="filter-content open">
          <div className="filter-option">
            <input type="checkbox" id="inStock" name="inStock" />
            <label htmlFor="inStock">En existencia (9)</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="outOfStock" name="outOfStock" />
            <label htmlFor="outOfStock">Agotado (3)</label>
          </div>
        </div>
      </div>

      {/* Filtro de Precio */}
      <div className="filter-group">
        <h4 className="filter-title">PRICE</h4>
        <div className="filter-content open">
          {/* Aquí iría el componente de slider de precio */}
          <p>Gs. {price[0].toLocaleString('es-PY')} - Gs. {price[1].toLocaleString('es-PY')}</p>
          <p style={{fontSize: '0.8em', color: '#666'}}>El slider de precios se implementará aquí.</p>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;