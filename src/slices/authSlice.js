// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Definir los usuarios y sus roles
const users = [
    { username: 'admin@test.do', password: 'Admin', role: 'Administrador' },
    { username: 'policia@test.do', password: 'Polizonte', role: 'Institucional' },
    { username: 'contraloria@test.do', password: 'Chequear', role: 'Consulta' },
    { username: 'ayuda@test.do', password: 'Ayudar', role: 'Mesa de Ayuda' },
];

const initialState = {
    user: null, // Almacena los datos del usuario
    isAuthenticated: false, // Si el usuario está autenticado
    role: null, // El rol del usuario
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;

            // Verificar si el usuario y la contraseña son correctos
            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                state.user = user; // Almacenar el usuario
                state.isAuthenticated = true;
                state.role = user.role; // Almacenar el rol del usuario
            } else {
                state.user = null;
                state.isAuthenticated = false;
                state.role = null;
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
