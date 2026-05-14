import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

/*
  Webhook: /api/pagopar/webhook
  Pagopar envía un POST aquí cuando se realiza un pago.
  IMPORTANTE: Debe devolver el mismo JSON recibido + respuesta:true
  dentro de un array, como indica la documentación oficial.
*/

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook Pagopar recibido:', JSON.stringify(body));

    // Detectar dónde viene el objeto del pago
    let pago: Record<string, unknown>;
    if (Array.isArray(body)) {
      pago = body[0];
    } else if (body.resultado && Array.isArray(body.resultado)) {
      pago = body.resultado[0];
    } else {
      pago = body;
    }

    // Validar token opcional
    try {
      const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
      const hashPedido = (pago.hash_pedido ?? pago.hash ?? '') as string;
      if (hashPedido) {
        const expectedToken = crypto
          .createHash('sha1')
          .update(`${privateKey}${hashPedido}`)
          .digest('hex');
        console.log('Token recibido:', pago.token);
        console.log('Token esperado:', expectedToken);
      }
    } catch (tokenErr) {
      console.error('Error validando token:', tokenErr);
    }

    // Actualizar estado en Supabase si el pago fue confirmado
    try {
      const pagado = pago.pagado === true ||
        pago.estado === 'PAGO-CONFIRMADO' ||
        pago.estado === 'PAGADO';

      if (pagado) {
        await supabase
          .from('orders')
          .update({ status: 'Pagado' })
          .eq('order_details->>payment_method', 'pagopar');
        console.log('Pedido marcado como pagado en Supabase');
      }
    } catch (dbErr) {
      console.error('Error actualizando Supabase:', dbErr);
    }

    // RESPUESTA EXACTA QUE PAGOPAR EXIGE:
    // Array con el mismo objeto recibido + respuesta:true
    const respuesta = [{ ...pago, respuesta: true }];
    console.log('Respuesta enviada a Pagopar:', JSON.stringify(respuesta));

    return NextResponse.json(respuesta, { status: 200 });

  } catch (err) {
    console.error('Error en webhook Pagopar:', err);
    return NextResponse.json([{ respuesta: true }], { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json([{ respuesta: true }], { status: 200 });
}