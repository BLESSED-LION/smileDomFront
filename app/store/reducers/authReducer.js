// store/reducers/authReducer.js
const initialState = {
    isLoggedIn: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload // Store user data
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
};

export default authReducer
