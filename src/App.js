// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Importa el store configurado
import Encabezado from './components/Encabezado'; // Ajuste de ruta
import Principal from './components/Principal'; // Ajuste de ruta
import Pie from './components/Pie'; // Ajuste de ruta

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Encabezado />
                <Principal />
                <Pie />
            </div>
        </Provider>
    );
}

export default App;
