import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const json_pagopar = await request.json();
    console.log('Webhook Pagopar recibido:', JSON.stringify(json_pagopar));

    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;

    // Verificación básica de datos
    if (!json_pagopar.resultado || !json_pagopar.resultado[0]) {
      return NextResponse.json({ error: 'Datos insuficientes' }, { status: 400 });
    }

    const pedido = json_pagopar.resultado[0];

    // Validación del Token: sha1(private_key + hash_pedido)
    const tokenLocal = crypto
      .createHash('sha1')
      .update(privateKey + pedido.hash_pedido)
      .digest('hex');

    console.log('Token recibido:', pedido.token);
    console.log('Token esperado:', tokenLocal);

    if (tokenLocal !== pedido.token) {
      console.log('Token inválido detectado');
      return new Response('Token no coincide', { status: 401 });
    }

    // Actualizar estado en Supabase
    try {
      if (pedido.pagado === true) {
        await supabase
          .from('orders')
          .update({ status: 'Pagado' })
          .eq('order_details->>payment_method', 'pagopar');
        console.log(`Pedido ${pedido.hash_pedido} marcado como Pagado`);
      } else if (pedido.cancelado === true) {
        await supabase
          .from('orders')
          .update({ status: 'Cancelado' })
          .eq('order_details->>payment_method', 'pagopar');
        console.log(`Pedido ${pedido.hash_pedido} marcado como Cancelado`);
      }
    } catch (dbErr) {
      console.error('Error actualizando Supabase:', dbErr);
    }

    // Respuesta obligatoria: devolver directamente el resultado
    console.log('Respuesta enviada:', JSON.stringify(json_pagopar.resultado));
    return NextResponse.json(json_pagopar.resultado, { status: 200 });

  } catch (error) {
    console.error('Error en Webhook:', error);
    return new Response('Error interno', { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json([{ respuesta: true }], { status: 200 });
}

