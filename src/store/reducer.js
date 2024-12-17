// src/store/reducer.js

const initialState = {
    user: null, // Almacenar� los datos del usuario si est� logueado
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null, // Resetea el estado de usuario al cerrar sesi�n
            };
        default:
            return state;
    }
};

export default rootReducer;
