import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

/*
  API Route: /api/pagopar
  Documentación oficial: https://developers.pagopar.com
*/

export async function POST(req: NextRequest) {
  try {
    const {
      publicKey,
      amount,
      description,
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerRuc,
      buyerAddress,
    } = await req.json();

    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://impatto.com.py';

    // Pagopar requiere un ID de pedido único
    const orderId = `IMP-${Date.now()}`;

    // Hash requerido por Pagopar: SHA1 del token_privado + monto + id_pedido
    const hashStr = `${privateKey}${amount}${orderId}`;
    const hash = crypto.createHash('sha1').update(hashStr).digest('hex').toUpperCase();

    const body = {
      token_publico: publicKey,
      hashkey: hash,
      id_pedido: orderId,
      descripcion: description,
      monto: String(amount),
      tipo_pedido: 'VENTA',
      ciudad_envio: 'Asuncion',
      comprador: {
        nombre: buyerName,
        apellido: '',
        ruc: buyerRuc ?? '0000000-0',
        email: buyerEmail,
        telefono: buyerPhone,
        direccion: buyerAddress ?? 'Asuncion, Paraguay',
        ciudad: 'Asuncion',
        pais: 'PRY',
      },
      url_retorno: `${siteUrl}/pago-exitoso`,
      url_cancelacion: `${siteUrl}/pago-cancelado`,
      url_respuesta: `${siteUrl}/api/pagopar/webhook`,
      items: [
        {
          nombre: description,
          cantidad: 1,
          precio_unitario: String(amount),
          descripcion: description,
          iva: '10',
          categoria_pagopar: '101', // Categoría general
        },
      ],
    };

    const res = await fetch('https://api.pagopar.com/api/comercios/1.1/token-compra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('Respuesta Pagopar:', JSON.stringify(data));

    // Pagopar devuelve la URL en data.respuesta.url_pago
    const checkoutUrl = data?.respuesta?.url_pago ?? null;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'No se pudo obtener URL de pago', detail: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ checkoutUrl });

  } catch (err) {
    console.error('Error en /api/pagopar:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}