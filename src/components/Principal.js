// src/components/Principal.js
import React from 'react';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../slices/authSlice'; // Acción para actualizar la opción seleccionada
import AutenticaDO from './AutenticaDO';  // Componente de autenticación
import SubirNominaJSON from './SubirNominaJSON';  // Componente para subir la nómina

function Principal() {
    const dispatch = useDispatch(); // Usamos dispatch para disparar acciones
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Verificamos si el usuario está autenticado
    const selectedOption = useSelector((state) => state.auth.selectedOption); // Obtenemos la opción seleccionada del estado global

    // Función que maneja el clic en el menú para cambiar la opción seleccionada
    const handleMenuItemClick = (item) => {
        dispatch(setSelectedOption(item)); // Actualizamos el estado de la opción seleccionada
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '20px', paddingBottom: '40px' }}>
            {/* Si el usuario no está autenticado, mostramos el componente de autenticación */}
            {!isAuthenticated ? (
                <AutenticaDO />
            ) : (
                <>
                    {/* Renderizamos SubirNominaJSON solo cuando la opción seleccionada es "SubirNomina" */}
                    {selectedOption === 'SubirNomina' && <SubirNominaJSON />}
                </>
            )}
        </Container>
    );
}

export default Principal;
