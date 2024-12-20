// src/components/AutenticaDO.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, IconButton, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';

function AutenticaDO() {
    const [email, setEmail] = useState(''); // Estado local para el email
    const [password, setPassword] = useState(''); // Estado local para la contraseña
    const dispatch = useDispatch();

    // Extraer el mensaje de error desde Redux
    const error = useSelector((state) => state.auth.error);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Despachar la acción de login con los datos del formulario
        dispatch(login({ username: email, password }));
    };

    return (
        <Paper
            sx={{
                padding: '40px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: 6, // Sombra más fuerte para darle profundidad
            }}
        >
            {/* Título del formulario */}
            <Typography variant="h5" align="center" sx={{ marginBottom: '30px', fontWeight: 'bold' }}>
                Iniciar sesión
            </Typography>

            {/* Mostrar error si proviene de Redux */}
            {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Campo de correo electrónico */}
                    <Grid item xs={12}>
                        <TextField
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <IconButton position="start">
                                        <EmailIcon sx={{ color: '#003876' }} />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Campo de contraseña */}
                    <Grid item xs={12}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <IconButton position="start">
                                        <LockIcon sx={{ color: '#003876' }} />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Botón de inicio de sesión */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                padding: '12px',
                                backgroundColor: '#003876', // Azul
                                '&:hover': {
                                    backgroundColor: '#EE2A24', // Rojo al hacer hover
                                    boxShadow: 4, // Efecto de sombra al hover
                                },
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default AutenticaDO;
