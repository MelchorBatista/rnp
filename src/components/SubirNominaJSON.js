import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, LinearProgress, Button, Box } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import CheckCircle from '@mui/icons-material/CheckCircle';  // Ícono de validación

function SubirNominaJSON({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progreso de la carga
  const [anio, setAnio] = useState(null); // Año extraído del JSON
  const [mes, setMes] = useState(null); // Mes extraído del JSON
  const [organismo, setOrganismo] = useState(null); // CodigoOrganismoMAP extraído del JSON
  const [detalle, setDetalle] = useState([]); // Detalle (arreglo de empleados)
  const [showDialog, setShowDialog] = useState(false); // Controla la visibilidad de la nueva caja de diálogo
  const fileInputRef = useRef(null);

  const resetFileInput = () => {
    setFile(null);
    setError('');
    setProgress(0); // Reseteamos el progreso
    setLoading(false);
    setAnio(null);
    setMes(null);
    setOrganismo(null);
    setDetalle([]);
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
        const { progress, success, error, data } = event.data;

        if (progress !== undefined) {
          // Actualizamos el progreso
          setProgress(progress);
        }

        if (success) {
          // Extraemos los valores del JSON y actualizamos el estado
          setAnio(data.Anio);
          setMes(data.Mes);
          setOrganismo(data.CodigoOrganismoMAP);
          setDetalle(data.Detalle);  // Guardamos el arreglo de empleados
          setLoading(false);  // Terminó la validación exitosa
          setShowDialog(true); // Mostramos la nueva caja de diálogo con los mensajes
          setOpen(false); // Cierra el diálogo de carga si la validación fue exitosa
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

  const handleDialogClose = () => {
    setShowDialog(false); // Cerrar la nueva caja de diálogo
  };

  return (
    <div>
      {/* Diálogo para mostrar los mensajes dinámicos */}
      <Dialog
        open={showDialog}
        onClose={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic fuera
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#003876', color: 'white', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
          <CheckCircle sx={{ fontSize: 30 }} /> {/* Ícono a la izquierda del título */}
          Validación de Nómina
        </DialogTitle>
        <DialogContent sx={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
          {/* Mensajes con separación mínima entre ellos */}
          <Typography variant="body2" sx={{ color: '#000', marginBottom: '0px', fontWeight: 'bold' }}>
            Año: {anio}
          </Typography>
          <Typography variant="body2" sx={{ color: '#000', marginBottom: '0px', fontWeight: 'bold' }}>
            Mes: {mes}
          </Typography>
          <Typography variant="body2" sx={{ color: '#000', marginBottom: '0px', fontWeight: 'bold' }}>
            Organismo: {organismo}
          </Typography>
          {/* Aquí podrías agregar más componentes dinámicos si es necesario */}
          <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              variant="contained"
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
              onClick={handleDialogClose}
            >
              Aceptar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Diálogo de carga */}
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
    </div>
  );
}

export default SubirNominaJSON;
