import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

function isValidEmail(email: string): boolean {
  return /^[\w.-]+@[\w.-]+\.\w{2,6}$/.test(email);
}

interface SubscriberBody {
  email: string;
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as SubscriberBody;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { message: 'Por favor, ingresa un correo válido.' },
      { status: 400 }
    );
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.execute('INSERT INTO subscribers (email) VALUES (?)', [
      email,
    ]);

    return NextResponse.json(
      { message: 'Suscripción exitosa' },
      { status: 201 }
    );
  } catch (err) {
    const error = err as { code?: string };
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { message: 'Este correo ya está suscrito.' },
        { status: 409 }
      );
    }
    console.error(err);
    return NextResponse.json(
      { message: 'Error interno del servidor.' },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.end();
  }
}
