'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function FlyerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: '',
    phones: '',
    socials: ''
  });

  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const processImage = (file) => {
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona una imagen válida.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Target dimensions (max 800px width/height)
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image to JPEG format with 0.7 quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setPreview(compressedBase64);
        setFormData(prev => ({ ...prev, photo: compressedBase64 }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    setError('');
    processImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title || !formData.description || !formData.photo) {
      setError('Por favor, completa los campos obligatorios: título, descripción y foto.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/flyers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          photo: formData.photo,
          phones: formData.phones.split(',').map(p => p.trim()).filter(p => p),
          socials: formData.socials.split(',').map(s => s.trim()).filter(s => s),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar el flyer');
      }

      // Redirect to the newly created flyer
      router.push(`/${data.data.id}`);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-warning">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="title">Título del Flyer (Ej: SE BUSCA: Juan Pérez) *</label>
        <input 
          type="text" 
          id="title"
          name="title" 
          className="form-input" 
          placeholder="Escribe un título claro y conciso"
          value={formData.title}
          onChange={handleInputChange}
          maxLength={100}
          required 
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="photo">Foto *</label>
        <input 
          type="file" 
          id="photo"
          accept="image/*" 
          className="form-input" 
          onChange={handleImageChange}
          required={!preview}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {preview && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Descripción / Información relevante *</label>
        <textarea 
          id="description"
          name="description" 
          className="form-textarea" 
          placeholder="Escribe la información detallada aquí..."
          value={formData.description}
          onChange={handleInputChange}
          maxLength={500}
          required 
        ></textarea>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phones">Teléfonos de contacto (Separados por coma)</label>
        <input 
          type="text" 
          id="phones"
          name="phones" 
          className="form-input" 
          placeholder="Ej: +58 414 1234567, 0212 9876543"
          value={formData.phones}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="socials">Redes sociales (Separadas por coma)</label>
        <input 
          type="text" 
          id="socials"
          name="socials" 
          className="form-input" 
          placeholder="Ej: @usuario_ig, twitter.com/usuario"
          value={formData.socials}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Generando Flyer...' : 'Generar Flyer de Emergencia'}
      </button>
    </form>
  );
}
