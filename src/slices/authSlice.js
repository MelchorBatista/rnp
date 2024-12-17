// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // Inicializamos user como null
    isAuthenticated: false, // Inicializamos el estado de autenticación como false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload; // Asignamos el usuario al estado
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null; // Limpiamos el estado del usuario al cerrar sesión
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
