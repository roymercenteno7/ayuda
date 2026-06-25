'use client';

import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

export default function FlyerView({ flyer }) {
  const flyerRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleDownload = async () => {
    if (!flyerRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(flyerRef.current, {
        scale: 2, // Better quality
        useCORS: true, // Allow cross-origin images if any
        backgroundColor: '#ffffff'
      });
      
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = `emergencia-${flyer.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.click();
    } catch (err) {
      console.error('Error al descargar la imagen:', err);
      alert('Hubo un error al generar la imagen. Por favor, intenta de nuevo o toma una captura de pantalla.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="alert alert-warning">
        <strong>IMPORTANTE:</strong> Guarda este enlace ({url}) o descarga la imagen. No hay forma de buscar este flyer de nuevo si pierdes el enlace.
      </div>

      <div className="flyer-wrapper" ref={flyerRef}>
        <div className="flyer-header">
          <h1 className="flyer-title">{flyer.title}</h1>
        </div>

        {flyer.photo && (
          <div className="flyer-image-container">
            <img src={flyer.photo} alt={flyer.title} className="flyer-image" />
          </div>
        )}

        <div className="flyer-desc">
          {flyer.description}
        </div>

        {(flyer.phones?.length > 0 || flyer.socials?.length > 0) && (
          <div className="flyer-contacts">
            {flyer.phones?.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <h3>TELÉFONOS DE CONTACTO:</h3>
                {flyer.phones.map((phone, i) => (
                  <p key={i}>{phone}</p>
                ))}
              </div>
            )}

            {flyer.socials?.length > 0 && (
              <div>
                <h3>REDES SOCIALES:</h3>
                {flyer.socials.map((social, i) => (
                  <p key={i}>{social}</p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flyer-footer">
          Generado en ayuda.roymer.dev • {flyer.formattedDate}
        </div>
      </div>

      <div className="actions">
        <button 
          className="btn btn-primary" 
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? 'Generando...' : 'Descargar Imagen'}
        </button>
        <button 
          className="btn" 
          onClick={handleCopyLink}
        >
          {copied ? '¡Enlace copiado!' : 'Copiar Enlace'}
        </button>
      </div>
    </div>
  );
}
