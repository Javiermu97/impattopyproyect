import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const orderData = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // Estructuramos los datos para que coincidan con la tabla
  const { 
    formData, 
    department, 
    formVariant, 
    product, 
    selectedQuantity, 
    totalPrice 
  } = orderData;

  const orderToInsert = {
    customer_name: formData.name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    shipping_address: formData.address + ', ' + formData.city,
    department: department,
    total_amount: totalPrice,
    status: 'Pendiente', // Estado inicial
    order_details: { // Guardamos los detalles como un objeto JSON
      product_id: product.id,
      product_name: product.name,
      variant_color: formVariant.color,
      quantity: selectedQuantity,
      unit_price: product.price
    }
  };

  // Insertamos la orden en la base de datos
  const { data, error } = await supabase
    .from('orders')
    .insert(orderToInsert)
    .select()
    .single();

  if (error) {
    console.error('Error al guardar la orden:', error);
    return NextResponse.json({ error: 'No se pudo crear la orden.' }, { status: 500 });
  }

  // Si todo va bien, podrías aquí mismo llamar a la lógica para enviar el email
  // ... (lógica para enviar email con Resend, etc.)

  return NextResponse.json({ success: true, order: data });
}