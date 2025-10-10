import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined;
  if (!code) return res.redirect('/login?error=missing_code');

  const { error } = await supabaseServer.auth.exchangeCodeForSession({ authCode: code });
  if (error) return res.redirect('/login?error=oauth');

  return res.redirect('/');
}
