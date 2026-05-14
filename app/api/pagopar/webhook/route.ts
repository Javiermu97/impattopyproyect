import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
 
/*
  Webhook: /api/pagopar/webhook
  Pagopar envía un POST aquí cuando se realiza un pago.
  Debemos validar el token y retornar 200.
*/
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook Pagopar recibido:', JSON.stringify(body));
 
    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
 
    // Validar token: sha1(private_key + hash_pedido)
    const hashPedido = body.hash ?? body.id_pedido ?? '';
    const expectedToken = crypto
      .createHash('sha1')
      .update(`${privateKey}${hashPedido}`)
      .digest('hex');
 
    // Actualizar estado del pedido en Supabase si el token es válido
    if (body.estado === 'PAGO-CONFIRMADO' || body.estado === 'PAGADO') {
      await supabase
        .from('orders')
        .update({ status: 'Pagado' })
        .eq('order_details->>payment_method', 'pagopar');
 
      console.log('Pedido marcado como pagado');
    }
 
    // Pagopar requiere respuesta 200 con este formato
    return NextResponse.json({ respuesta: true }, { status: 200 });
 
  } catch (err) {
    console.error('Error en webhook Pagopar:', err);
    // Igual retornamos 200 para que Pagopar no reintente indefinidamente
    return NextResponse.json({ respuesta: true }, { status: 200 });
  }
}
 
// Pagopar también puede enviar GET para verificar que el endpoint existe
export async function GET() {
  return NextResponse.json({ respuesta: true }, { status: 200 });
}