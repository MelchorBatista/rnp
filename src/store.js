// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Importación del reducer desde authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer del slice de autenticación
  },
});

export default store;
