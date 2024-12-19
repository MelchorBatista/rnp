self.onmessage = function (event) {
  const file = event.data;  // Datos que recibimos del hilo principal
  const reader = new FileReader();
  const CHUNK_SIZE = 1024 * 1024; // Leer en bloques de 1MB
  let start = 0;
  let end = CHUNK_SIZE;
  const totalSize = file.size;
  let fileContent = '';  // Variable para concatenar los bloques leídos

  reader.onload = function () {
    fileContent += reader.result;

    // Calcular el progreso
    const progress = Math.min((end / totalSize) * 100, 100);

    // Enviar el progreso (aseguramos que es un número)
    self.postMessage({ progress: parseFloat(progress.toFixed(1)) });

    if (start >= totalSize) {
      try {
        const data = JSON.parse(fileContent); // Intentamos parsear el JSON

        // Validaciones...
        if (!data || typeof data !== 'object' || !data.Anio || !data.Mes || !data.CodigoOrganismoMAP || !data.Detalle) {
          self.postMessage({ error: 'El JSON debe tener los campos Anio, Mes, CodigoOrganismoMAP y Detalle.' });
          return;
        }

        // Validaciones adicionales...

        // Si todo es válido, enviamos los datos al hilo principal
        self.postMessage({
          success: true,
          data: {
            Anio: data.Anio,
            Mes: data.Mes,
            CodigoOrganismoMAP: data.CodigoOrganismoMAP,
            Detalle: data.Detalle  // Enviamos el arreglo de empleados
          }
        });

      } catch (error) {
        self.postMessage({ error: 'El archivo no es un JSON válido.' });
        return;
      }
    } else {
      // Leer el siguiente bloque
      start = end;
      end = start + CHUNK_SIZE;
      reader.readAsText(file.slice(start, end));
    }
  };

  reader.onerror = function () {
    self.postMessage({ error: 'Error al leer el archivo.' });
  };

  // Empezamos a leer el primer bloque
  reader.readAsText(file.slice(start, end));
};
