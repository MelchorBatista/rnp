import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery, Drawer } from '@mui/material';
import { Menu as MenuIcon, PersonAdd, Gavel, Help, Settings, Assessment, CloudUpload } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setSelectedOption } from '../slices/authSlice'; // Importamos la acción setSelectedOption
import SubirNominaJSON from './SubirNominaJSON';  // Asegúrate de que la ruta sea correcta

function Encabezado() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);
    const error = useSelector((state) => state.auth.error);
    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const [open, setOpen] = useState(false);  // Inicializamos 'open' en false

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleMenuItemClick = (item) => {
        if (item === 'SubirNomina') {
          dispatch(setSelectedOption('SubirNomina')); // Actualizar la opción seleccionada
          setOpen(true); // Abrir el cuadro de diálogo
        }
      };
      

    const menuItemsLoggedOut = [
        { text: 'Solicitar Acceso', icon: <PersonAdd /> },
        { text: 'Reglamentos', icon: <Gavel /> },
        { text: 'Ayuda', icon: <Help /> }
    ];

    const menuItemsLoggedIn = {
        Administrador: [
            { text: 'Configuración', icon: <Settings /> },
            { text: 'Usuarios', icon: <PersonAdd /> },
            { text: 'Subir Nómina', icon: <CloudUpload />, action: 'SubirNomina' }, // Añadimos la acción en el menú
            { text: 'Reportes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> }
        ],
        Institucional: [
            { text: 'Configuración', icon: <Settings /> },
            { text: 'Subir Nómina', icon: <CloudUpload />, action: 'SubirNomina' }, // Acción para subir nómina
            { text: 'Reportes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> }
        ],
        Consulta: [
            { text: 'Configuración', icon: <Settings /> },
            { text: 'Reportes', icon: <Assessment /> },
            { text: 'Ayuda', icon: <Help /> }
        ],
        Ayuda: [
            { text: 'Configuración', icon: <Settings /> },
            { text: 'Ayuda', icon: <Help /> }
        ],
    };

    const drawerButtonStyle = {
        padding: '10px',
        borderRadius: '0',
        width: '100%',
        justifyContent: 'flex-start',
        '&:hover': {
            backgroundColor: '#EE2A24',
            '& .MuiTypography-root': {
                color: 'white',
            },
            '& .MuiSvgIcon-root': {
                color: 'white',
            },
        },
    };

    const horizontalButtonStyle = {
        padding: '8px 16px',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: '#EE2A24',
            color: 'white',
        },
    };

    const getMenuWidth = (numItems) => {
        // Definir anchos para diferentes cantidades de elementos
        if (numItems === 2) return '50%'; // 2 opciones, 50% de ancho
        if (numItems === 3) return '33.33%'; // 3 opciones, 33.33% de ancho
        if (numItems === 4) return '25%'; // 4 opciones, 25% de ancho
        return '20%'; // 5 o más opciones, 20% de ancho
    };

    const horizontalMenuStyle = (numItems) => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', // Para permitir que los elementos se acomoden a una nueva fila si es necesario
        gap: '4px',
        marginLeft: 'auto',
        backgroundColor: '#003876',
        width: '100%',
        maxWidth: '100%',
    });

    const drawerMenuStyle = {
        width: 250,
        backgroundColor: 'white',
    };

    const renderMenuItems = (menuItems, isDrawer) => {
        return menuItems.map((item) => (
            <IconButton
                key={item.text}
                color="inherit"
                sx={isDrawer ? drawerButtonStyle : horizontalButtonStyle}
                onClick={() => item.action && handleMenuItemClick(item.action)} // Llamamos a handleMenuItemClick cuando la opción tiene una acción
            >
                {item.icon}
                <Typography
                    variant="body2"
                    sx={{
                        marginLeft: 1,
                        color: isDrawer ? 'black' : 'white',
                        transition: 'color 0.3s',
                    }}
                >
                    {item.text}
                </Typography>
            </IconButton>
        ));
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#003876', width: '100%', zIndex: 1300 }}>
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
                            maxWidth: '100%',
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem', lineHeight: 0.5, paddingTop: 1, paddingBottom: 0.25 }}>
                            Recepción de
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.60rem', lineHeight: 0.95 }}>
                            Nóminas Públicas
                        </Typography>
                    </Box>
                </Box>

                {!drawerOpen && !isMobile && (
                    <Box sx={horizontalMenuStyle(menuItemsLoggedIn[role] ? menuItemsLoggedIn[role].length : 0)}>
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
            <SubirNominaJSON open={open} setOpen={setOpen} />
        </AppBar>
    );
}

export default Encabezado;
