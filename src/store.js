// src/store.js

import { createStore } from 'redux';
import rootReducer from './store/reducer'; // Aseg�rate de que la ruta es correcta

const store = createStore(rootReducer);

export default store;
