// src/store/reducer.js

const initialState = {
    user: null, // Almacenará los datos del usuario si está logueado
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null, // Resetea el estado de usuario al cerrar sesión
            };
        default:
            return state;
    }
};

export default rootReducer;
