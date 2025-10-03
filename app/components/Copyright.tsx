// /app/components/Copyright.tsx

import React from 'react';

const Copyright = () => {
  return (
    <div className="copyright-section">
      <p>© {new Date().getFullYear()}, Impatto PY. Todos los derechos reservados | Desarrollado por Impatto Devs</p>
    </div>
  );
};

export default Copyright;