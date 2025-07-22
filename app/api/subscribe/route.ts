import { NextResponse } from 'next/server';

// Corrección: Se añadió el tipo ': Request' al parámetro 'req'
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Please provide an email address." }, { status: 400 });
    }

    // Aquí puedes añadir la lógica para guardar el email en tu lista de suscripción
    console.log("Email recibido para suscripción:", email);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    // Corrección: Se añadió un tipo explícito para 'error'
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error processing subscription request:", errorMessage);
    return NextResponse.json({ message: "Error processing request." }, { status: 500 });
  }
}