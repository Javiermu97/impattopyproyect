import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

/*
  API Route: /api/pagopar/route.ts
  Documentación: https://soporte.pagopar.com/portal/es/kb/api
  Endpoint: https://api.pagopar.com/api/comercios/2.0/iniciar-transaccion
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
      productImageUrl,
    } = await req.json();

    const privateKey = process.env.PAGOPAR_PRIVATE_KEY!;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://impatto.com.py';

    // ID único del pedido
    const orderId = `IMP-${Date.now()}`;

    // Hash: sha1(token_privado + id_pedido_comercio + monto_como_float)
    const montoFloat = String(parseFloat(String(amount)));
    const hashStr = `${privateKey}${orderId}${montoFloat}`;
    const token = crypto.createHash('sha1').update(hashStr).digest('hex');

    // Fecha máxima de pago: 24 horas desde ahora
    const fechaMaxima = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .substring(0, 19);

    // Documento: eliminar guión y asegurar que tenga valor
    const documento = buyerRuc && buyerRuc.trim() !== ''
      ? buyerRuc.replace('-', '').replace(/\s/g, '')
      : '0000000';

    const body = {
      token,
      public_key: publicKey,
      monto_total: amount,
      tipo_pedido: 'VENTA-COMERCIO',
      id_pedido_comercio: orderId,
      descripcion_resumen: description,
      fecha_maxima_pago: fechaMaxima,
      comprador: {
        nombre: buyerName,
        email: buyerEmail,
        telefono: buyerPhone,
        ruc: buyerRuc ?? '',
        documento: documento,
        tipo_documento: 'CI',
        direccion: buyerAddress ?? '',
        direccion_referencia: null,
        coordenadas: '',
        razon_social: buyerName,
        ciudad: '1',
      },
      compras_items: [
        {
          nombre: description,
          descripcion: description,
          cantidad: 1,
          precio_total: amount,
          id_producto: 1,
          categoria: '909',
          ciudad: '1',
          public_key: publicKey,
          url_imagen: productImageUrl ?? '',
          vendedor_telefono: '',
          vendedor_direccion: '',
          vendedor_direccion_referencia: '',
          vendedor_direccion_coordenadas: '',
        },
      ],
    };

    console.log('Enviando a Pagopar:', JSON.stringify(body));

    const res = await fetch('https://api.pagopar.com/api/comercios/2.0/iniciar-transaccion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('Respuesta Pagopar:', JSON.stringify(data));

    if (!data.respuesta || !data.resultado?.[0]?.data) {
      return NextResponse.json(
        { error: 'Error de Pagopar', detail: data },
        { status: 500 }
      );
    }

    const hashPedido = data.resultado[0].data;
    const checkoutUrl = `https://www.pagopar.com/pagos/${hashPedido}`;

    return NextResponse.json({ checkoutUrl });

  } catch (err) {
    console.error('Error en /api/pagopar:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
