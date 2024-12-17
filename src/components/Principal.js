// src/components/Principal.js

import React from 'react';
import { Container, Typography } from '@mui/material';

function Principal() {
    return (
        <Container>
            <Typography variant="h4" sx={{ marginTop: 4, color: '#003876' }}>
                Bienvenido al Portal para Recepción de Nóminas Públicas (RNP)
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Este es el portal para Recibir los datos de las Nóminas Públicas de las instituciones que no han sido incorporadas al SASP o SIGEI.
            </Typography>
        </Container>
    );
}

export default Principal;
