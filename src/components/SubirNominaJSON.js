import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, LinearProgress, Button, Box } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';

function SubirNominaJSON({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const fileInputRef = useRef(null);

  // Resetear todos los estados antes de cargar un nuevo archivo
  const resetFileInput = () => {
    setFile(null);
    setError('');
    setProgress(0);
    setLoading(false);
    setJsonData(null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  // Función para manejar el cambio de archivo
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
    readFileWithProgress(selectedFile);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Función para leer el archivo con progreso
  const readFileWithProgress = (file) => {
    const reader = new FileReader();
    const fileSize = file.size;

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / fileSize) * 100);
        setProgress(percentLoaded);
      }
    };

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result); // Intentamos parsear el JSON
        setJsonData(data);
        validateJsonData(data); // Llamamos a la validación después de parsear
        setLoading(false);
      } catch (err) {
        setError('Formato de JSON incorrecto. No se pudo parsear el archivo.');
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error al leer el archivo.');
      setLoading(false);
    };

    reader.readAsText(file);
  };

// Función para validar los datos del JSON
const validateJsonData = (data) => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1; // El año anterior

  // Validar que el JSON tenga las claves necesarias
  if (!data.hasOwnProperty('Anio') || !data.hasOwnProperty('Mes') || !data.hasOwnProperty('CodigoOrganismoMAP')) {
    setError('El archivo JSON debe contener los campos "Anio", "Mes" y "CodigoOrganismoMAP".');
    return; // Si hay un error, no cerramos el cuadro de diálogo
  }

  // Validar Año (Anio)
  const anio = Number(data.Anio); // Asegurarnos de que Anio es un número
  if (isNaN(anio)) {
    setError('El Año debe ser un número.');
    return;
  }
  if (anio !== currentYear && anio !== previousYear) {
    setError('El Año debe ser el año actual o el año anterior.');
    return;
  }

  // Validar Mes
  if (isNaN(data.Mes)) {
    setError('El Mes debe ser un número.');
    return;
  }
  if (data.Mes < 1 || data.Mes > 12) {
    setError('El Mes debe ser un número entre 1 y 12.');
    return;
  }

  // Validar CodigoOrganismoMAP
  const codigoOrganismoMAP = Number(data.CodigoOrganismoMAP); // Asegurarnos de que CodigoOrganismoMAP es un número
  if (isNaN(codigoOrganismoMAP)) {
    setError('El Código del Organismo debe ser un número.');
    return;
  }
  if (codigoOrganismoMAP <= 0) {
    setError('El Código del Organismo debe ser un número mayor que 0.');
    return;
  }

  // Si pasa todas las validaciones, cerramos el diálogo
  setOpen(false); // Solo cerramos el diálogo si no hay errores
};


  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#003876',
          color: 'white',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
        }}
      >
        <CloudUpload sx={{ fontSize: 30 }} />
        Subir JSON de Nómina
      </DialogTitle>
      <DialogContent sx={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
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
        </Box>

        {loading && (
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="body2" sx={{ color: '#000', marginBottom: '10px' }}>
              Cargando JSON de Nómina...
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" sx={{ marginTop: '10px', color: '#000', textAlign: 'center' }}>
              {progress}%
            </Typography>
          </Box>
        )}

        {error && (
          <Typography variant="body2" sx={{ color: '#EE2A24', marginBottom: '20px' }}>
            {error}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubirNominaJSON;
