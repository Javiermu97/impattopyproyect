import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, customerName, customerEmail, total, products } = body;

    // 1. Configuración de Zoho
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com', 
      port: 465, 
      secure: true,
      auth: {
        user: 'administracion@impatto.com.py', 
        pass: process.env.ZOHO_PASSWORD, 
      },
    });

    // 2. Correo para el ADMINISTRADOR (Tú)
    const mailToAdmin = {
      from: '"Impatto Ventas" <administracion@impatto.com.py>',
      to: 'impattopy@gmail.com', // Tu Gmail
      subject: `💰 Nueva Venta #${orderId} - Gs. ${total}`,
      html: `
        <h2>¡Nueva Venta!</h2>
        <p><strong>Cliente:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Total:</strong> Gs. ${total}</p>
        <p><strong>Producto:</strong> ${products}</p>
        <a href="https://impatto.com.py/admin/pedidos">Ver en Admin</a>
      `,
    };

    // 3. Correo para el CLIENTE (Bonito)
    const mailToClient = {
      from: '"Impatto PY" <administracion@impatto.com.py>',
      to: customerEmail, // El correo del cliente
      subject: `✅ ¡Gracias por tu compra! Pedido #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background-color: #A78D5A; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
             <h1 style="color: white; margin: 0;">IMPATTO</h1>
          </div>
          
          <div style="padding: 20px;">
            <h2 style="color: #333;">¡Hola ${customerName}!</h2>
            <p>Hemos recibido tu pedido correctamente. En breve nos pondremos en contacto contigo vía WhatsApp para coordinar la entrega.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #555;">Resumen del Pedido #${orderId}</h3>
              <p><strong>Producto:</strong> ${products}</p>
              <p style="font-size: 18px; color: green;"><strong>Total a Pagar: Gs. ${total}</strong></p>
            </div>

            <p>Si tienes alguna duda, responde a este correo.</p>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <p style="text-align: center; font-size: 14px; color: #666;">
              Síguenos en nuestras redes:<br/>
              <a href="https://facebook.com/Impattopy" style="color: #1877F2; text-decoration: none; font-weight: bold;">Facebook: Impatto Py</a> | 
              <a href="https://instagram.com/impattopy" style="color: #E4405F; text-decoration: none; font-weight: bold;">Instagram: @impattopy</a>
            </p>
          </div>
        </div>
      `,
    };

    // Enviar ambos correos al mismo tiempo
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToClient)
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error enviando correos:', error);
    return NextResponse.json({ error: 'Fallo envío' }, { status: 500 });
  }
}