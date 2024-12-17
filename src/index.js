// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiar a react-dom/client
import App from './App';
import { Provider } from 'react-redux'; // Importamos Provider de react-redux
import store from './store'; // Importamos el store de Redux

// Creamos el root de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Proveemos el store de Redux a la app */}
      <App />
    </Provider>
  </React.StrictMode>
);
