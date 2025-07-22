// Contenido para el archivo: app/api/send-order-email/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  // 1. Obtiene los datos del pedido que envió el cliente
  const data = await req.json();
  const { formData, orderId, product, selectedQuantity, formVariant, totalPrice } = data;

  // 2. Configura el "transportador" de correo con tus datos de SiteGround
  // (Encuéntralos en Site Tools > Email > Cuentas > Configuración de email > Manual)
  const transporter = nodemailer.createTransport({
    host: 'mail.impatto.com.py', // Probablemente sea este, si no, reemplázalo
    port: 465,
    secure: true, // true para puerto 465
    auth: {
      user: 'info@impatto.com.py', // Tu correo empresarial
      pass: 'Impatto2025', // ¡IMPORTANTE! Reemplaza con la contraseña de tu correo
    },
  });

  // 3. Define el contenido de los dos correos
  const businessEmailHtml = `
    <h3>¡Nuevo Pedido! - Orden #${orderId}</h3>
    <p>Has recibido un nuevo pedido en tu tienda.</p>
    <hr>
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
        <li><strong>Dirección:</strong> ${formData.address}, ${data.formData.city}, ${data.department}</li>
    </ul>
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
        <li><strong>Dirección de Envío:</strong> ${formData.address}, ${data.formData.city}, ${data.department}</li>
    </ul>
    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
    <p>Atentamente,<br>El equipo de Impatto Py</p>
  `;

  try {
    // 4. Envía los dos correos
    await transporter.sendMail({
      from: '"Impatto Py" <info@impatto.com.py>',
      to: 'info@impatto.com.py, impattopy@gmail.com',// El correo para ti
      subject: `¡Nuevo Pedido! - Orden #${orderId}`,
      html: businessEmailHtml,
    });

    await transporter.sendMail({
      from: '"Impatto Py" <info@impatto.com.py>',
      to: formData.email, // El correo para el cliente
      subject: `Confirmación de tu pedido #${orderId} en Impatto Py`,
      html: customerEmailHtml,
    });

    // 5. Responde que todo salió bien
    return NextResponse.json({ message: 'Emails enviados correctamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al enviar los correos' }, { status: 500 });
  }
}