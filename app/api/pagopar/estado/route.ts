import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

/*
  Endpoint: /api/pagopar/estado
  Consulta el estado actual de un pedido en Pagopar.
  Documentación: https://api.pagopar.com/api/pedidos/1.1/traer
  Token: sha1(private_key + "TRAER-PEDIDO")
*/

export async function POST(req: NextRequest) {
  try {
    const { hashPedido } = await req.json();

    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const publicKey = process.env.NEXT_PUBLIC_PAGOPAR_PUBLIC_KEY!;

    // Hash requerido: sha1(private_key + "TRAER-PEDIDO")
    const token = crypto
      .createHash('sha1')
      .update(`${privateKey}TRAER-PEDIDO`)
      .digest('hex');

    const res = await fetch('https://api.pagopar.com/api/pedidos/1.1/traer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        token_publico: publicKey,
        hash_pedido: hashPedido,
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