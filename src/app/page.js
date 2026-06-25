import FlyerForm from '@/components/FlyerForm';

export default function Home() {
  return (
    <main>
      <div className="container text-center" style={{ borderTop: '4px solid var(--accent)' }}>
        <h1 className="title">Ayuda Emergencia</h1>
        <p className="subtitle">
          Generador de flyers de respuesta rápida. Completa los datos para crear un cartel con información crucial.
        </p>
      </div>

      <div className="alert alert-warning">
        <strong>ATENCIÓN:</strong> Una vez generado el flyer, debes copiar el enlace o descargar la imagen. 
        Por motivos de privacidad y seguridad, no existe un buscador de publicaciones, y si sales de la página no podrás recuperarlo.
      </div>

      <div className="container">
        <FlyerForm />
      </div>

      <footer style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', color: '#999', fontSize: '0.9rem' }}>
        <a 
          href="https://github.com/roymercenteno7/ayuda" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#fff', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          Código Abierto en GitHub
        </a>
      </footer>
    </main>
  );
}
