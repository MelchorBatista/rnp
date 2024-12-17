// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Definir los usuarios y sus roles
const users = [
    { username: 'admin@test.do', password: 'Admin', role: 'Administrador' },
    { username: 'policia@test.do', password: 'Polizonte', role: 'Institucional' },
    { username: 'contraloria@test.do', password: 'Chequear', role: 'Consulta' },
    { username: 'ayuda@test.do', password: 'Ayudar', role: 'Ayuda' },
];

const initialState = {
    user: null,          // Almacena los datos del usuario
    isAuthenticated: false, // Si el usuario está autenticado
    role: null,          // El rol del usuario
    error: null,         // Mensaje de error
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;

            // Verificar si algún campo está vacío
            if (!username || !password) {
                state.error = 'Todos los campos son obligatorios';
                return;
            }

            // Buscar si el usuario existe
            const user = users.find((u) => u.username === username);

            if (!user) {
                state.error = 'Usuario no encontrado';
                return;
            }

            // Verificar si la contraseña coincide
            if (user.password !== password) {
                state.error = 'Nombre de usuario o clave incorrecta';
                return;
            }

            // Login exitoso
            state.user = user;
            state.isAuthenticated = true;
            state.role = user.role;
            state.error = null; // Limpiar errores previos
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.role = null;
            state.error = null; // Limpiar errores
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
