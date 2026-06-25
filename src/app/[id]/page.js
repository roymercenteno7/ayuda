import { sql } from '@/lib/neon';
import FlyerView from '@/components/FlyerView';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    const result = await sql`SELECT * FROM flyers WHERE id = ${id}`;
    const flyer = result[0];

    if (!flyer) {
      return { title: 'No encontrado' };
    }

    return {
      title: `${flyer.title} | Ayuda Emergencia`,
      description: flyer.description.substring(0, 150) + '...',
      openGraph: {
        title: flyer.title,
        description: flyer.description.substring(0, 150) + '...',
        images: [
          {
            url: flyer.photo,
            width: 800,
            height: 600,
            alt: flyer.title,
          },
        ],
      },
    };
  } catch (e) {
    return { title: 'Ayuda Emergencia' };
  }
}

export default async function FlyerPage({ params }) {
  const { id } = await params;
  let flyer = null;

  try {
    const result = await sql`SELECT * FROM flyers WHERE id = ${id}`;
    flyer = result[0];
    
    if (flyer) {
      if (flyer.created_at) {
        // Formatear en el servidor para evitar discrepancias de hidratación en el cliente
        const dateObj = new Date(flyer.created_at);
        flyer.formattedDate = dateObj.toISOString().split('T')[0] + ' ' + dateObj.toTimeString().split(' ')[0];
        flyer.createdAt = flyer.created_at.toISOString();
      }
    }
  } catch (error) {
    console.error('Error buscando flyer:', error);
  }

  if (!flyer) {
    notFound();
  }

  return (
    <main>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/" className="btn" style={{ padding: '0.5rem 1rem', width: 'auto', display: 'inline-block', fontSize: '0.9rem' }}>
          ← Crear un nuevo Flyer
        </Link>
      </div>
      
      <FlyerView flyer={flyer} />
    </main>
  );
}
