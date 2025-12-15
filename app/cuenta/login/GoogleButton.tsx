'use client';

import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function GoogleButton() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/cuenta`,
      },
    });
  };

  return (
    <button
      type="button"
      className="auth-google"
      onClick={signInWithGoogle}
    >
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={18}
        height={18}
      />
      <span>Iniciar sesión con Google</span>
    </button>
  );
}




