import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery, Drawer, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ExitToApp, PersonAdd, Gavel, Help, Settings, Assessment } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

function Encabezado() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role); // Obtenemos el rol del usuario
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    // Menú cuando el usuario no está autenticado
    const menuItemsLoggedOut = [
        { text: 'Solicitar Acceso', icon: <PersonAdd /> },
        { text: 'Reglamentos', icon: <Gavel /> },
        { text: 'Ayuda', icon: <Help /> }
    ];

    // Menú según el rol del usuario
    const menuItemsLoggedIn = {
        Administrador: [
            { text: 'Panel de Administración', icon: <Settings /> },
            { text: 'Gestión de Usuarios', icon: <PersonAdd /> },
            { text: 'Ayuda', icon: <Help /> },
        ],
        Institucional: [
            { text: 'Informes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> },
        ],
        Consulta: [
            { text: 'Ver Reportes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> },
        ],
        'Mesa de Ayuda': [
            { text: 'Soporte', icon: <Help /> },
        ],
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#003876' }}>
            <Toolbar>
                {/* Icono de menú para dispositivos móviles */}
                {isMobile && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{
                            display: drawerOpen ? 'none' : 'block', // Solo mostrar el menú en dispositivos móviles si el Drawer está cerrado
                        }}
                    >
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                )}

                {/* Contenedor con el logo y texto */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img
                        src="https://uxkit.digital.gob.do/images/gob-icon.svg"
                        alt="Logo"
                        style={{
                            height: '36px',
                            width: 'auto',
                            marginRight: 8,
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 0, padding: 0 }}>
                        <div style={{ margin: 0, padding: 0 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem', margin: 0, padding: 0, lineHeight: 0.8 }}>
                                Recepción de
                            </Typography>
                        </div>

                        <div style={{ margin: 0, padding: 0 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    lineHeight: 0.85,
                                    fontSize: { xs: '2rem', sm: '1.80rem' }, // Tamaño de texto según tamaño de pantalla
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                Nóminas Públicas
                            </Typography>
                        </div>
                    </Box>
                </Box>

                {/* Menú horizontal visible solo cuando el Drawer no está abierto */}
                {!drawerOpen && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '16px', // Espaciado entre los iconos
                            marginLeft: 'auto', // Alineamos los iconos hacia la derecha
                            display: isMobile ? 'none' : 'flex', // Solo mostrar el menú horizontal en pantallas grandes
                        }}
                    >
                        {!user ? (
                            <>
                                {menuItemsLoggedOut.map((item) => (
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
                                ))}
                            </>
                        ) : (
                            <>
                                {menuItemsLoggedIn[role] && menuItemsLoggedIn[role].map((item) => (
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
                                ))}

                                <IconButton color="inherit" sx={{ padding: '10px' }} onClick={handleLogout}>
                                    <ExitToApp />
                                    <Typography variant="body2" sx={{ marginLeft: 1, color: 'white' }}>
                                        Cerrar sesión
                                    </Typography>
                                </IconButton>
                            </>
                        )}
                    </Box>
                )}
            </Toolbar>

            {/* Menú desplegable en dispositivos móviles */}
            {isMobile && (
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    sx={{
                        '& .MuiDrawer-paper': {
                            backgroundColor: 'white', // Fondo blanco por defecto
                        },
                    }}
                >
                    <Box sx={{ width: 250 }}>
                        {/* Eliminar la palabra "Menu" */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {user && menuItemsLoggedIn[role] ? (
                                menuItemsLoggedIn[role].map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        onClick={toggleDrawer}
                                        sx={{
                                            padding: '10px',
                                            backgroundColor: 'white', // Fondo blanco por defecto
                                            color: 'black', // Texto negro por defecto
                                            '&:hover': {
                                                backgroundColor: '#EE2A24', // Fondo rojo en hover
                                                color: 'white', // Texto blanco en hover
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white', // Cambiar el color del icono a blanco
                                                },
                                                '& .MuiTypography-root': {
                                                    fontWeight: 'bold', // Texto en negrita en hover
                                                    color: 'white', // Texto blanco en hover
                                                },
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
                            ) : (
                                menuItemsLoggedOut.map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        onClick={toggleDrawer}
                                        sx={{
                                            padding: '10px',
                                            backgroundColor: 'white', // Fondo blanco por defecto
                                            color: 'black', // Texto negro por defecto
                                            '&:hover': {
                                                backgroundColor: '#EE2A24', // Fondo rojo en hover
                                                color: 'white', // Texto blanco en hover
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white', // Cambiar el color del icono a blanco
                                                },
                                                '& .MuiTypography-root': {
                                                    fontWeight: 'bold', // Texto en negrita en hover
                                                    color: 'white', // Texto blanco en hover
                                                },
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
                            )}
                        </Box>
                    </Box>
                </Drawer>
            )}
        </AppBar>
    );
}

export default Encabezado;
