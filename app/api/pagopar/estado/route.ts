import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

/*
  Endpoint: /api/pagopar/estado
  Consulta el estado actual de un pedido en Pagopar.
  URL Pagopar: https://api.pagopar.com/api/pedidos/1.1/traer
  Token: sha1(private_key + "CONSULTA")
*/

export async function POST(req: NextRequest) {
  try {
    const { hashPedido } = await req.json();

    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const publicKey = process.env.NEXT_PUBLIC_PAGOPAR_PUBLIC_KEY!;

    // Token correcto según documentación: sha1(private_key + "CONSULTA")
    const token = crypto
      .createHash('sha1')
      .update(privateKey + "CONSULTA")
      .digest('hex');

    const res = await fetch('https://api.pagopar.com/api/pedidos/1.1/traer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hash_pedido: hashPedido,
        token,
        token_publico: publicKey,
      }),
    });

    const data = await res.json();
    console.log('Estado pedido Pagopar:', JSON.stringify(data));

    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    console.error('Error consultando estado pedido:', err);
    return NextResponse.json(
      { error: 'Error consultando estado' },
      { status: 500 }
    );
  }
}
