import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Pagopar envía { resultado: [...], respuesta: true }
    const resultado = body.resultado ?? (Array.isArray(body) ? body : [body]);
    const pago = resultado[0];

    if (!pago) {
      return NextResponse.json([{ respuesta: false, error: "No data" }], { status: 200 });
    }

    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const hashPedido = pago.hash_pedido;

    // Validación según Documentación: sha1(private_key + hash_pedido)
    const expectedToken = crypto
      .createHash('sha1')
      .update(privateKey + hashPedido) // Concatenación limpia
      .digest('hex');

    if (pago.token !== expectedToken) {
      console.error('⚠️ TOKEN INVÁLIDO: No coincide con lo esperado');
      // Respondemos 200 para que dejen de enviar, pero no procesamos nada
      return NextResponse.json(resultado, { status: 200 });
    }

    // --- ACTUALIZACIÓN DE BASE DE DATOS ---
    try {
      // Buscamos el pedido específico que coincida con este hash
      // Asumo que guardaste el hash en una columna llamada 'pagopar_hash' o similar
      const nuevoEstado = pago.pagado ? 'Pagado' : (pago.cancelado ? 'Cancelado' : 'Pendiente');

      await supabase
        .from('orders')
        .update({ 
          status: nuevoEstado,
          payment_data: pago // Guardamos todo lo que nos mandó Pagopar por si acaso
        })
        .eq('pagopar_hash', hashPedido); // 👈 CRUCIAL: Usar el hash para encontrar EL pedido

      console.log(`✅ Pedido ${hashPedido} actualizado a: ${nuevoEstado}`);
    } catch (dbErr) {
      console.error('❌ Error Supabase:', dbErr);
    }

    // --- RESPUESTA EXIGIDA POR PAGOPAR ---
    // Retornar directamente el contenido del resultado del JSON enviado
    return NextResponse.json(resultado, { status: 200 });

  } catch (err) {
    console.error('💥 Error crítico Webhook:', err);
    return NextResponse.json({ respuesta: false }, { status: 200 });
  }
}

export async function GET() {
  return new Response("Webhook activo", { status: 200 });
}
