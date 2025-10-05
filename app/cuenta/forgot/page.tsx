// /app/cuenta/forgot/page.tsx

import { Suspense } from 'react';
// La ruta correcta: sube un nivel a 'cuenta' y luego entra a 'login'
import ForgotPasswordComponent from '../login/ForgotPasswordComponent'; 

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ForgotPasswordComponent />
    </Suspense>
  );
}