// /app/cuenta/login/page.tsx

import { Suspense } from 'react';
import LoginComponent from './LoginComponent'; // Importamos el componente que acabas de renombrar

export default function LoginPage() {
  return (
    // Esto crea el "espacio en blanco" que Next.js necesita
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginComponent />
    </Suspense>
  );
}