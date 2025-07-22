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

export async function POST(request: Request) {
  const {
    formData,
    orderId,
    product,
    selectedQuantity,
    formVariant,
    totalPrice,
    department,
  } = (await request.json()) as OrderBody;

  const transporter = nodemailer.createTransport({
    host: 'mail.impatto.com.py',
    port: 465,
    secure: true,
    auth: { user: 'info@impatto.com.py', pass: 'Impatto2025' },
  });

  const businessEmailHtml = `
    <h3>¡Nuevo Pedido! - Orden #${orderId}</h3>
    <ul>
      <li><strong>Producto:</strong> ${selectedQuantity} x ${product.name} (${formVariant.color})</li>
      <li><strong>Monto Total:</strong> Gs. ${totalPrice.toLocaleString('es-PY')}</li>
      <li><strong>Dirección:</strong> ${formData.address}, ${formData.city}, ${department}</li>
    </ul>`;

  const customerEmailHtml = `
    <h3>¡Gracias por tu compra, ${formData.name}!</h3>
    <p>Hemos recibido tu pedido #${orderId}.</p>
    <ul>
      <li><strong>Producto:</strong> ${selectedQuantity} x ${product.name} (${formVariant.color})</li>
      <li><strong>Total a Pagar:</strong> Gs. ${totalPrice.toLocaleString('es-PY')}</li>
    </ul>`;

  try {
    await transporter.sendMail({
      from: '"Impatto Py" <info@impatto.com.py>',
      to: 'info@impatto.com.py, impattopy@gmail.com',
      subject: `¡Nuevo Pedido! - Orden #${orderId}`,
      html: businessEmailHtml,
    });

    await transporter.sendMail({
      from: '"Impatto Py" <info@impatto.com.py>',
      to: formData.email,
      subject: `Confirmación de tu pedido #${orderId}`,
      html: customerEmailHtml,
    });

    return NextResponse.json({ message: 'Emails enviados' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error al enviar los correos' },
      { status: 500 }
    );
  }
}
