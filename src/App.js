// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Importa el store configurado
import Encabezado from './components/Encabezado'; // Ajuste de ruta
import Principal from './components/Principal'; // Ajuste de ruta
import Pie from './components/Pie'; // Ajuste de ruta
import { CssBaseline, GlobalStyles } from '@mui/material';

function App() {
    return (
        <Provider store={store}>
            {/* Resetear estilos globales */}
            <CssBaseline />
            <GlobalStyles
                styles={{
                    html: { margin: 0, padding: 0, width: '100%', height: '100%' },
                    body: { margin: 0, padding: 0, width: '100%', height: '100%' },
                    '#root': { margin: 0, padding: 0, width: '100%', height: '100%' },
                    '.App': { margin: 0, padding: 0, width: '100%', height: '100%' }
                }}
            />

            <div className="App">
                {/* Encabezado ocupa todo el ancho */}
                <Encabezado />
                {/* Contenido principal */}
                <Principal />
                {/* Pie de página */}
                <Pie />
            </div>
        </Provider>
    );
}

export default App;
