import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';
import crypto from 'crypto';

export const maxDuration = 60;

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, photo, phones, socials } = body;

    if (!title || !description || !photo) {
      return NextResponse.json(
        { error: 'Título, descripción y foto son requeridos' },
        { status: 400 }
      );
    }

    // Generar un ID amigable de 6 caracteres alfanuméricos
    const friendlyId = crypto.randomBytes(3).toString('hex'); // Ej: a1b2c3

    // Insert en Neon PostgreSQL
    const result = await sql`
      INSERT INTO flyers (id, title, description, photo, phones, socials)
      VALUES (
        ${friendlyId},
        ${title}, 
        ${description}, 
        ${photo}, 
        ${phones || []}, 
        ${socials || []}
      )
      RETURNING *;
    `;

    const flyer = result[0];

    return NextResponse.json({ success: true, data: flyer }, { status: 201 });
  } catch (error) {
    console.error('Error creando flyer en Neon:', error);
    return NextResponse.json(
      { error: 'Error del servidor al procesar la solicitud' },
      { status: 500 }
    );
  }
}
