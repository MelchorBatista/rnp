// src/components/Encabezado.js

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery, Drawer, MenuItem, Grid } from '@mui/material';
import { Menu as MenuIcon, ExitToApp, PersonAdd, Gavel, Help, Settings, UploadFile, Assessment } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions';

function Encabezado() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const menuItemsLoggedOut = [
        { text: 'Entrar', icon: <ExitToApp /> },
        { text: 'Solicitar Acceso', icon: <PersonAdd /> },
        { text: 'Reglamentos', icon: <Gavel /> },
        { text: 'Ayuda', icon: <Help /> }
    ];

    const menuItemsLoggedIn = [
        { text: 'Configuración', icon: <Settings /> },
        { text: 'Subir Nómina', icon: <UploadFile /> },
        { text: 'Reportes', icon: <Assessment /> },
        { text: 'Ayuda', icon: <Help /> }
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: '#003876' }}>
            <Toolbar>
                {/* Contenedor del ícono de menú para dispositivos móviles */}
                {isMobile && (
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                )}

                {/* Contenedor con el logo y texto */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    {/* Logo */}
                    <img
                        src="https://uxkit.digital.gob.do/images/gob-icon.svg"
                        alt="Logo"
                        style={{
                            height: '36px', // Aumento del 20% en el tamaño original
                            width: 'auto',
                            marginRight: 8, // Espacio entre el logo y el texto
                        }}
                    />

                    {/* Contenedor para "Recepción de" y "Nóminas Públicas" en divs separados */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 0, padding: 0 }}>
                        {/* "Recepción de" en su propio div */}
                        <div style={{ margin: 0, padding: 0 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem', margin: 0, padding: 0, lineHeight: 0.8 }}>
                                Recepción de
                            </Typography>
                        </div>

                        {/* "Nóminas Públicas" en su propio div */}
                        <div style={{ margin: 0, padding: 0 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: 0.85,  // Ajustando el espacio entre líneas
                                    fontSize: { xs: '2rem', sm: '1.80rem' },
                                    margin: 0,  // Eliminar cualquier margen
                                    padding: 0   // Eliminar cualquier padding
                                }}
                            >
                                Nóminas Públicas
                            </Typography>
                        </div>
                    </Box>
                </Box>

                {/* Iconos de menú para escritorio */}
                {!isMobile ? (
                    <>
                        {user ? (
                            menuItemsLoggedIn.map((item) => (
                                <IconButton
                                    key={item.text}
                                    color="inherit"
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '0',
                                        '&:hover': {
                                            backgroundColor: '#EE2A24',
                                            color: 'white',
                                            borderRadius: '0',
                                        },
                                    }}
                                >
                                    {item.icon}
                                    <Typography variant="body2" sx={{ marginLeft: 1, color: 'white' }}>
                                        {item.text}
                                    </Typography>
                                </IconButton>
                            ))
                        ) : (
                            menuItemsLoggedOut.map((item) => (
                                <IconButton
                                    key={item.text}
                                    color="inherit"
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '0',
                                        '&:hover': {
                                            backgroundColor: '#EE2A24',
                                            color: 'white',
                                            borderRadius: '0',
                                        },
                                    }}
                                >
                                    {item.icon}
                                    <Typography variant="body2" sx={{ marginLeft: 1, color: 'white' }}>
                                        {item.text}
                                    </Typography>
                                </IconButton>
                            ))
                        )}
                    </>
                ) : (
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                        <Box sx={{ width: 250 }} role="presentation">
                            <Typography variant="h6" sx={{ padding: 2, color: 'white' }}>Menú</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {user
                                    ? menuItemsLoggedIn.map((item) => (
                                        <MenuItem
                                            key={item.text}
                                            onClick={toggleDrawer}
                                            sx={{
                                                padding: '10px',
                                                borderRadius: '0',
                                                '&:hover': {
                                                    backgroundColor: '#EE2A24',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <IconButton sx={{ color: 'black' }}>
                                                {item.icon}
                                            </IconButton>
                                            <Typography variant="body2" sx={{ marginLeft: 1, color: 'black' }}>
                                                {item.text}
                                            </Typography>
                                        </MenuItem>
                                    ))
                                    : menuItemsLoggedOut.map((item) => (
                                        <MenuItem
                                            key={item.text}
                                            onClick={toggleDrawer}
                                            sx={{
                                                padding: '10px',
                                                borderRadius: '0',
                                                '&:hover': {
                                                    backgroundColor: '#EE2A24',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <IconButton sx={{ color: 'black' }}>
                                                {item.icon}
                                            </IconButton>
                                            <Typography variant="body2" sx={{ marginLeft: 1, color: 'black' }}>
                                                {item.text}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                            </Box>
                        </Box>
                    </Drawer>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Encabezado;
