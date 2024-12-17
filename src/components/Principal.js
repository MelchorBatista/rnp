// src/components/Principal.js

import React from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import AutenticaDO from './AutenticaDO'; // Importamos el componente de autenticación

function Principal() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Verificamos si el usuario está autenticado

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '20px', paddingBottom: '40px' }}>
            {/* Si el usuario no está autenticado, mostramos el componente de autenticación */}
            {!isAuthenticated ? (
                <AutenticaDO />
            ) : null}  {/* Cuando el usuario está autenticado, no mostramos nada */}
        </Container>
    );
}

export default Principal;
