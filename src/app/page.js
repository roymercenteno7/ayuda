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
    </main>
  );
}
