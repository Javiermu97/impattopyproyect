import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Configuración de la conexión usando las variables de tu archivo .env.local
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ message: 'Por favor, ingresa un correo válido.' }, { status: 400 });
  }

  let connection;
  try {
    // Conecta a la base de datos
    connection = await mysql.createConnection(dbConfig);

    // Inserta el correo en la tabla 'subscribers' de forma segura
    await connection.execute('INSERT INTO subscribers (email) VALUES (?)', [email]);

    return NextResponse.json({ message: 'Suscripción exitosa' }, { status: 201 });

  } catch (error: any) {
    // Si el correo ya existe
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'Este correo ya está suscrito.' }, { status: 409 });
    }

    // Para cualquier otro error
    console.error(error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });

  } finally {
    // Cierra la conexión siempre
    if (connection) {
      await connection.end();
    }
  }
}