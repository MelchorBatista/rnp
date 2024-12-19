import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, LinearProgress, Button, Box } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';

function SubirNominaJSON({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progreso de la carga
  const fileInputRef = useRef(null);

  const resetFileInput = () => {
    setFile(null);
    setError('');
    setProgress(0); // Reseteamos el progreso
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    resetFileInput();

    if (!selectedFile) {
      setError('No se seleccionó ningún archivo.');
      return;
    }

    if (!selectedFile.name.endsWith('.json')) {
      setError('El archivo seleccionado no tiene la extensión .json.');
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    startWebWorkers(selectedFile);
  };

  const startWebWorkers = (file) => {
    try {
      const worker = new Worker('./workers/fileReaderWorker.js');

      worker.postMessage(file);

      worker.onmessage = (event) => {
        const { progress, success, error } = event.data;

        if (progress !== undefined) {
          // Actualizamos el progreso
          setProgress(progress);
        }

        if (success) {
          setLoading(false);  // Terminó la validación exitosa
          setOpen(false); // Cierra el diálogo si la validación fue exitosa
        }

        if (error) {
          setError(error);  // Mostrar mensaje de error
          setLoading(false);  // Terminó la validación con error
        }
      };

      worker.onerror = (err) => {
        setError('Error en el Web Worker');
        console.error(err);
      };
    } catch (err) {
      setError('No se pudo crear el Web Worker');
      console.error('Error al crear el Web Worker:', err);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#003876', color: 'white', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
        <CloudUpload sx={{ fontSize: 30 }} />
        Subir JSON de Nómina
      </DialogTitle>
      <DialogContent sx={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Button variant="contained" component="label" sx={{ backgroundColor: '#003876', color: 'white', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', '&:hover': { backgroundColor: '#EE2A24', color: '#FFFFFF' } }}>
            Subir JSON
            <input type="file" accept=".json" hidden onChange={handleFileChange} ref={fileInputRef} />
          </Button>
        </Box>

        {loading && (
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="body2" sx={{ color: '#000', marginBottom: '10px' }}>Cargando JSON de Nómina...</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" sx={{ marginTop: '10px', color: '#000', textAlign: 'center' }}>{progress.toFixed(1)}%</Typography>
          </Box>
        )}

        {error && (
          <Typography variant="body2" sx={{ color: '#EE2A24', marginBottom: '20px' }}>{error}</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubirNominaJSON;
