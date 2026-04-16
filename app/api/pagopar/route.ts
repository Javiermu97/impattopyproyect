import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { publicKey, amount, description, buyerName, buyerEmail, buyerPhone } = await req.json();

  // Documentación Pagopar: https://developers.pagopar.com
  const res = await fetch('https://api.pagopar.com/api/comercios/1.1/token-compra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token_publico: publicKey,
      monto: amount,
      descripcion: description,
      nombre_comprador: buyerName,
      email_comprador: buyerEmail,
      telefono_comprador: buyerPhone,
    }),
  });

  const data = await res.json();

  // Pagopar devuelve la URL de pago en data.respuesta.url_pago
  const checkoutUrl = data?.respuesta?.url_pago ?? null;

  return NextResponse.json({ checkoutUrl });
}