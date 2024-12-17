// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para la autenticación
const initialState = {
    user: null, // Almacena los datos del usuario si está logueado
    isAuthenticated: false, // Estado de autenticación
};

// Crear el slice de autenticación
const authSlice = createSlice({
    name: 'auth', // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Acción para iniciar sesión
        login: (state, action) => {
            state.user = action.payload; // Asignamos los datos del usuario al estado
            state.isAuthenticated = true; // Marcamos como autenticado
        },

        // Acción para cerrar sesión
        logout: (state) => {
            state.user = null; // Limpiamos los datos del usuario
            state.isAuthenticated = false; // Marcamos como no autenticado
        },
    },
});

// Exportamos las acciones generadas automáticamente por createSlice
export const { login, logout } = authSlice.actions;

// Exportamos el reducer para usarlo en el store
export default authSlice.reducer;
