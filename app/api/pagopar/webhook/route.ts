import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

/*
  Webhook: /api/pagopar/webhook
  Pagopar envía un POST aquí cuando se realiza un pago.
  Este endpoint debe:
  1. Recibir el JSON enviado por Pagopar.
  2. (Opcional) Validar el token.
  3. Actualizar el pedido en Supabase.
  4. Devolver EXACTAMENTE el mismo objeto recibido,
     dentro de un array, agregando "respuesta": true.
*/

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Recibir el cuerpo enviado por Pagopar
    let body = await req.json();

    console.log(
      'Webhook Pagopar recibido:',
      JSON.stringify(body, null, 2)
    );

    // Asegurar que siempre sea un array
    // Pagopar espera que la respuesta tenga esta estructura:
    // [
    //   {
    //     ...datos recibidos,
    //     "respuesta": true
    //   }
    // ]
    let data: any[];

    if (Array.isArray(body)) {
      data = body;
    } else if (body.resultado && Array.isArray(body.resultado)) {
      // En algunos casos Pagopar envía { resultado: [ ... ] }
      data = body.resultado;
    } else {
      data = [body];
    }

    const pago = data[0];

    // ==========================
    // VALIDACIÓN OPCIONAL TOKEN
    // ==========================
    try {
      const privateKey = process.env.PAGOPAR_PRIVATE_KEY;

      if (privateKey && pago.hash_pedido) {
        const expectedToken = crypto
          .createHash('sha1')
          .update(`${privateKey}${pago.hash_pedido}`)
          .digest('hex');

        console.log('Token recibido:', pago.token);
        console.log('Token esperado:', expectedToken);

        // Si deseas validar estrictamente:
        // if (pago.token !== expectedToken) {
        //   throw new Error('Token inválido');
        // }
      }
    } catch (tokenError) {
      console.error('Error validando token:', tokenError);
      // No detenemos el flujo para no bloquear la simulación
    }

    // ==========================
    // ACTUALIZAR EN SUPABASE
    // ==========================
    try {
      const pagado =
        pago.pagado === true ||
        pago.estado === 'PAGO-CONFIRMADO' ||
        pago.estado === 'PAGADO';

      if (pagado) {
        await supabase
          .from('orders')
          .update({ status: 'Pagado' })
          .eq('order_details->>payment_method', 'pagopar');

        console.log('Pedido marcado como pagado');
      }
    } catch (dbError) {
      console.error('Error actualizando Supabase:', dbError);
      // Continuamos igualmente para que Pagopar reciba respuesta correcta
    }

    // ==========================
    // RESPUESTA OBLIGATORIA
    // ==========================
    // Agregar "respuesta": true al primer objeto
    data[0].respuesta = true;

    // Devolver EXACTAMENTE el array con todos los datos
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Error en webhook Pagopar:', err);

    // Incluso ante errores, Pagopar necesita una respuesta válida
    return NextResponse.json(
      [
        {
          respuesta: true,
        },
      ],
      { status: 200 }
    );
  }
}

// Pagopar también puede hacer GET para verificar el endpoint
export async function GET() {
  return NextResponse.json(
    [
      {
        respuesta: true,
      },
    ],
    { status: 200 }
  );
}