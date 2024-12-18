import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, LinearProgress, Button } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';

function SubirNominaJSON({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [processStarted, setProcessStarted] = useState(false);
  const [headerValidationError, setHeaderValidationError] = useState('');
  const [validData, setValidData] = useState(null);

  const fileInputRef = useRef(null);

  const handleClose = () => {
    setOpen(false); // Cierra el diálogo
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Resetear estados antes de procesar un nuevo archivo
    setFile(null);
    setError('');
    setHeaderValidationError('');
    setValidData(null);
    setProgress(0);
    setLoading(false);
    setProcessStarted(false);

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
    setProgress(0);
    readFileWithProgress(selectedFile);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';  // Limpiar el input
    }
  };

  const readFileWithProgress = (file) => {
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        setProgress(percentLoaded);
      }
    };

    reader.onloadstart = () => {
      setLoading(true);
      setProgress(0);
    };

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result);
        console.log('Archivo JSON cargado correctamente', jsonData);
        setLoading(false);
        validateHeader(jsonData);
      } catch (err) {
        setError('Formato de JSON Incorrecto.');
        setLoading(false);
        return;
      }
    };

    reader.onerror = () => {
      setError('Error al leer el archivo.');
      setLoading(false);
    };

    reader.readAsText(file);
  };

  const validateHeader = (jsonData) => {
    const currentYear = new Date().getFullYear();
    const validYears = [currentYear, currentYear - 1];

    if (!jsonData || typeof jsonData !== 'object') {
      setHeaderValidationError('El archivo JSON está vacío o tiene una estructura incorrecta.');
      return;
    }

    if (!validYears.includes(jsonData.Anio)) {
      setHeaderValidationError(`El año debe ser ${currentYear} o ${currentYear - 1}.`);
      return;
    }

    if (jsonData.Mes < 1 || jsonData.Mes > 12) {
      setHeaderValidationError('El mes debe estar entre 1 y 12.');
      return;
    }

    if (jsonData.CodigoOrganismoMAP <= 0 || isNaN(jsonData.CodigoOrganismoMAP)) {
      setHeaderValidationError('El CodigoOrganismoMAP debe ser un número mayor a 0.');
      return;
    }

    setValidData({
      Anio: jsonData.Anio,
      Mes: jsonData.Mes,
      CodigoOrganismoMAP: jsonData.CodigoOrganismoMAP,
    });
    setHeaderValidationError('');
    console.log('Encabezado del JSON válido.');
    setOpen(false); // Cerrar el diálogo si el JSON es válido
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#003876',
          color: 'white',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          paddingtop: '4px',
          paddingBottom: '8px',
        }}
      >
        <CloudUpload sx={{ fontSize: 30, paddingtop: '0' }} />
        Subir JSON de Nómina
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '20px',
          backgroundColor: '#FFFFFF',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#000000' }}>
          Selecciona un archivo JSON para cargar los datos de la nómina.
        </Typography>

        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: '#003876',
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#EE2A24',
              color: '#FFFFFF',
            },
            marginBottom: '10px',
          }}
        >
          Subir JSON
          <input
            type="file"
            accept=".json"
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Button>

        {file && (
          <Typography variant="body2" sx={{ marginTop: '10px', color: '#000000' }}>
            Archivo seleccionado: {file.name}
          </Typography>
        )}
        {loading && (
          <div style={{ marginTop: '20px' }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" sx={{ marginTop: '10px', color: '#000000' }}>
              Cargando... {progress}%
            </Typography>
          </div>
        )}
        {error && (
          <Typography variant="body2" sx={{ marginTop: '10px', color: '#EE2A24' }}>
            {error}
          </Typography>
        )}
        {headerValidationError && (
          <Typography variant="body2" sx={{ marginTop: '10px', color: '#EE2A24' }}>
            {headerValidationError}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubirNominaJSON;
