'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function GoogleButton() {
  const supabase = createClientComponentClient();

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`, // ← tu dominio
        queryParams: { prompt: 'select_account' }
      }
    });
  };

  return <button onClick={signIn}>Sign in with Google</button>;
}
