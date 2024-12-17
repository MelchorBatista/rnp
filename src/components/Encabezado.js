import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery, Drawer } from '@mui/material';
import { Menu as MenuIcon, PersonAdd, Gavel, Help, Settings, Assessment, CloudUpload } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

function Encabezado() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const menuItemsLoggedOut = [
        { text: 'Solicitar Acceso', icon: <PersonAdd /> },
        { text: 'Reglamentos', icon: <Gavel /> },
        { text: 'Ayuda', icon: <Help /> }
    ];

    const menuItemsLoggedIn = {
        Administrador: [
            { text: 'Agregar Usuarios', icon: <PersonAdd /> },
            { text: 'Configuración', icon: <Settings /> },
            { text: 'Subir Nómina', icon: <CloudUpload /> },
            { text: 'Reportes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> }
        ],
        Institucional: [
            { text: 'Configuración', icon: <Settings /> },
            { text: 'Subir Nómina', icon: <CloudUpload /> },
            { text: 'Reportes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> }
        ],
    };

    const drawerButtonStyle = {
        padding: '10px',
        borderRadius: '0',
        width: '100%', // Botón ocupa toda la anchura
        justifyContent: 'flex-start',
        '&:hover': {
            backgroundColor: '#EE2A24', // Fondo rojo al hacer hover
            '& .MuiTypography-root': {
                color: 'white', // Texto blanco durante el hover
            },
            '& .MuiSvgIcon-root': {
                color: 'white', // Icono blanco durante el hover
            },
        },
    };

    const horizontalButtonStyle = {
        padding: '8px 16px',
        borderRadius: '4px',
        color: 'white', // Texto inicial blanco
        backgroundColor: 'transparent', // Fondo inicial transparente
        '&:hover': {
            backgroundColor: '#EE2A24', // Fondo rojo en hover
            color: 'white', // Texto blanco en hover
        },
    };

    const horizontalMenuStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        marginLeft: 'auto',
        display: isMobile ? 'none' : 'flex',
        backgroundColor: '#003876',
        padding: '8px',
    };

    const drawerMenuStyle = {
        width: 250,
        backgroundColor: 'white', // Fondo blanco en Drawer
    };

    const renderMenuItems = (menuItems, isDrawer) => {
        return menuItems.map((item) => (
            <IconButton
                key={item.text}
                color="inherit"
                sx={isDrawer ? drawerButtonStyle : horizontalButtonStyle}
            >
                {item.icon}
                <Typography
                    variant="body2"
                    sx={{
                        marginLeft: 1,
                        color: isDrawer ? 'black' : 'white', // Texto negro por defecto en Drawer
                        transition: 'color 0.3s',
                    }}
                >
                    {item.text}
                </Typography>
            </IconButton>
        ));
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#003876' }}>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{
                            display: drawerOpen ? 'none' : 'block',
                        }}
                    >
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                )}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem', lineHeight: 0.5, paddingTop: 1, paddingBottom: 0.25 }}>
                            Recepción de
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.80rem', lineHeight: 0.95  }}>
                            Nóminas Públicas
                        </Typography>
                    </Box>
                </Box>
                {!drawerOpen && (
                    <Box sx={horizontalMenuStyle}>
                        {!user
                            ? renderMenuItems(menuItemsLoggedOut, false)
                            : renderMenuItems(menuItemsLoggedIn[role] || [], false)}
                    </Box>
                )}
            </Toolbar>

            {isMobile && (
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    sx={{
                        '& .MuiDrawer-paper': drawerMenuStyle,
                    }}
                >
                    <Box sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            {user
                                ? renderMenuItems(menuItemsLoggedIn[role] || [], true)
                                : renderMenuItems(menuItemsLoggedOut, true)}
                        </Box>
                    </Box>
                </Drawer>
            )}
        </AppBar>
    );
}

export default Encabezado;
