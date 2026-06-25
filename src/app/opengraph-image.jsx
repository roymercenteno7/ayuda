import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Ayuda Emergencia Venezuela';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 300,
          background: '#d32f2f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: '-0.02em',
        }}
      >
        <div style={{ display: 'flex', fontSize: 350, marginBottom: '20px' }}>
          A
        </div>
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 'normal', opacity: 0.9 }}>
          Ayuda Emergencia VZLA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
