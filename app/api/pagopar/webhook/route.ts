import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

/*
  Webhook: /api/pagopar/webhook
  Pagopar envía un POST con esta estructura:
  {
    "resultado": [ { ...datos del pago... } ],
    "respuesta": true
  }

  El comercio DEBE responder con EXACTAMENTE el contenido de resultado:
  [ { ...datos del pago... } ]
*/

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook Pagopar recibido:', JSON.stringify(body));

    // Pagopar envía { resultado: [...], respuesta: true }
    const resultado = body.resultado ?? (Array.isArray(body) ? body : [body]);
    const pago = resultado[0];

    if (!pago) {
      console.error('No se encontró datos del pago');
      return NextResponse.json([{ respuesta: true }], { status: 200 });
    }

    // Validar token: sha1(private_key + hash_pedido)
    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const hashPedido = pago.hash_pedido ?? '';
    
    // Concatenación limpia para evitar errores de validación
    const expectedToken = crypto
      .createHash('sha1')
      .update(privateKey + hashPedido)
      .digest('hex');

    console.log('Token recibido:', pago.token);
    console.log('Token esperado:', expectedToken);

    if (pago.token !== expectedToken) {
      console.error('Token no coincide — posible petición maliciosa');
      // Respondemos el resultado como pide la doc, aunque sea inválido para que no reintenten
      return NextResponse.json(resultado, { status: 200 });
    }

    // Actualizar estado en Supabase
    try {
      if (pago.pagado === true) {
        await supabase
          .from('orders')
          .update({ status: 'Pagado' })
          .eq('pagopar_hash', hashPedido); // Usamos el hash único del pedido
        console.log('Pedido marcado como Pagado');
      } else if (pago.pagado === false && pago.cancelado === true) {
        await supabase
          .from('orders')
          .update({ status: 'Cancelado' })
          .eq('pagopar_hash', hashPedido);
        console.log('Pedido marcado como Cancelado');
      }
    } catch (dbErr) {
      console.error('Error actualizando Supabase:', dbErr);
    }

    // RESPUESTA EXACTA SEGÚN DOC: devolver el array "resultado" tal cual lo recibimos
    console.log('Respuesta enviada:', JSON.stringify(resultado));
    return NextResponse.json(resultado, { status: 200 });

  } catch (err) {
    console.error('Error en webhook Pagopar:', err);
    return NextResponse.json([{ respuesta: true }], { status: 200 });
  }
}

export async function GET() {
  // Útil para verificar que el endpoint está vivo
  return NextResponse.json({ status: "Webhook activo" }, { status: 200 });
}
