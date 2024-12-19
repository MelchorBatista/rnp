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
    const progress = (end / totalSize) * 100;

    // Enviar el progreso (aseguramos que es un número)
    self.postMessage({ progress: parseFloat(progress.toFixed(1)) });

    if (start >= totalSize) {
      try {
        const data = JSON.parse(fileContent); // Intentamos parsear el JSON

        // Validación 1: Asegurarse de que el JSON tenga las propiedades necesarias
        if (!data || typeof data !== 'object' || !data.Anio || !data.Mes || !data.CodigoOrganismoMAP || !data.Detalle) {
          self.postMessage({ error: 'El JSON debe tener los campos Anio, Mes, CodigoOrganismoMAP y Detalle.' });
          return;
        }

        // Validación 2: Anio debe ser igual al año de la fecha del sistema, o solo un año anterior
        const currentYear = new Date().getFullYear();
        const validAnio = data.Anio === currentYear || data.Anio === currentYear - 1;
        if (!validAnio) {
          self.postMessage({ error: 'El año debe ser el año actual o el año anterior.' });
          return;
        }

        // Validación 3: Mes debe ser un número entre 1 y 12
        const validMes = data.Mes >= 1 && data.Mes <= 12;
        if (!validMes) {
          self.postMessage({ error: 'El mes debe ser un número entre 1 y 12.' });
          return;
        }

        // Validación 4: CodigoOrganismoMAP debe ser un número mayor que 0
        const validCodigoOrganismoMAP = typeof data.CodigoOrganismoMAP === 'number' && data.CodigoOrganismoMAP > 0;
        if (!validCodigoOrganismoMAP) {
          self.postMessage({ error: 'CodigoOrganismoMAP debe ser un número mayor a 0.' });
          return;
        }

        // Validación 5: Detalle debe ser un arreglo
        if (!Array.isArray(data.Detalle)) {
          self.postMessage({ error: 'El campo Detalle debe ser un arreglo de empleados.' });
          return;
        }

        // Si todas las validaciones pasan, enviamos los datos al hilo principal
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
