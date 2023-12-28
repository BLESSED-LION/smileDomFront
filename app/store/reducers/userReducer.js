// store/reducers/authReducer.js
const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: action.payload // Store user data
            };
        default:
            return state;
    }
};

export default userReducer
