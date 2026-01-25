// app/cuenta/login/page.tsx
'use client';

import { Suspense } from 'react';
import LoginComponent from './LoginComponent';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #A78D5A', borderRadius: '50%' }}></div>
      </div>
    }>
      <LoginComponent />
    </Suspense>
  );
}