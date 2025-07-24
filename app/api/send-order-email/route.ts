// app/api/send-order-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderBody {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  orderId: number;
  product: { name: string };
  selectedQuantity: number;
  formVariant: { color: string };
  totalPrice: number;
  department: string;
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: OrderBody;

  try {
    body = await request.json();
  } catch (e) {
    console.error('JSON inválido', e);
    return NextResponse.json({ message: 'Body inválido' }, { status: 400 });
  }

  const {
    formData,
    orderId,
    product,
    selectedQuantity,
    formVariant,
    totalPrice,
    department,
  } = body || {};

  if (!formData || !orderId || !product) {
    return NextResponse.json({ message: 'Faltan datos en el pedido.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'mail.impatto.com.py',
    port: 465,
    secure: true,
    auth: {
      user: 'info@impatto.com.py',
      pass: process.env.MAIL_PASSWORD || 'Impatto2025',
    },
  });

  try {
    await transporter.verify();
  } catch (e) {
    console.error('SMTP verify falló:', e);
    return NextResponse.json({ message: 'No se pudo conectar al SMTP' }, { status: 500 });
  }

  const businessEmailHtml = `
    <h3>¡Nuevo Pedido! - Orden #${orderId}</h3>
    <h4>Detalles del Pedido:</h4>
    <ul>
      <li><strong>Producto:</strong> ${selectedQuantity} x ${product.name} (${formVariant.color})</li>
      <li><strong>Monto Total:</strong> Gs. ${totalPrice.toLocaleString('es-PY')}</li>
    </ul>
    <hr>
    <h4>Datos del Cliente:</h4>
    <ul>
      <li><strong>Nombre:</strong> ${formData.name}</li>
      <li><strong>Teléfono / WhatsApp:</strong> ${formData.phone}</li>
      <li><strong>Email:</strong> ${formData.email}</li>
      <li><strong>Dirección:</strong> ${formData.address}, ${formData.city}, ${department}</li>
    </ul>
    <br>
    <p>Mensaje generado automáticamente.</p>
  `;

  const customerEmailHtml = `
    <h3>¡Gracias por tu compra, ${formData.name}!</h3>
    <p>Hemos recibido tu pedido #${orderId} y ya lo estamos preparando.</p>
    <p>En breve nos pondremos en contacto contigo vía WhatsApp para coordinar la entrega y el pago.</p>
    <hr>
    <h4>Resumen de tu Pedido:</h4>
    <ul>
      <li><strong>Producto:</strong> ${selectedQuantity} x ${product.name} (${formVariant.color})</li>
      <li><strong>Monto Total a Pagar:</strong> Gs. ${totalPrice.toLocaleString('es-PY')}</li>
      <li><strong>Dirección de Envío:</strong> ${formData.address}, ${formData.city}, ${department}</li>
    </ul>
    <p>Si tienes alguna pregunta, responde a este correo.</p>
    <p>Atentamente,<br>¡El equipo de Impatto Py!</p>
  `;

  try {
    await Promise.all([
      transporter.sendMail({
        from: '"Tienda Impatto" <info@impatto.com.py>',
        to: 'info@impatto.com.py, impattopy@gmail.com',
        subject: `¡Nuevo Pedido! - Orden #${orderId}`,
        html: businessEmailHtml,
        text: '',
      }),
      transporter.sendMail({
        from: '"Tienda Impatto" <info@impatto.com.py>',
        to: formData.email,
        subject: `Confirmación de tu pedido #${orderId} en Impatto`,
        html: customerEmailHtml,
        text: '',
      }),
    ]);

   return NextResponse.json({ message: 'Emails enviados' }, { status: 200 });

  } catch (err) {
    // Tu manejo de errores aquí ya era perfecto, ¡excelente!
    if (err instanceof Error) {
      console.error('Error al enviar email:', err.message);
      return NextResponse.json({ message: `Error: ${err.message}` }, { status: 500 });
    }
    
    console.error('Error inesperado:', err);
    return NextResponse.json({ message: 'Ocurrió un error inesperado.' }, { status: 500 });
  }
}


