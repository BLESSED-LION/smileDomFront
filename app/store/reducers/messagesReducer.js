// store/reducers/authReducer.js
const initialState = {
    messages: [],
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MESSAGES':
            return {
                ...state,
                messages: action.payload // Store user data
            };
        default:
            return state;
    }
};

export default messagesReducer
