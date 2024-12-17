// src/components/Pie.js

import React from 'react';
import { Box, Typography } from '@mui/material';

function Pie() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#003876', // Color de fondo azul
                color: 'white', // Texto blanco
                paddingTop: '0.25rem', // Reducir el padding arriba
                paddingBottom: '0.25rem', // Reducir el padding abajo
                position: 'fixed',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 1000, // Asegura que el pie de página esté por encima de otros elementos si es necesario
            }}
        >
            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                © 2024 Ministerio de Administración Pública (MAP)
            </Typography>
        </Box>
    );
}

export default Pie;
