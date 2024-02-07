// store/reducers/authReducer.js
const initialState = {
    doctors: [],
};

const doctorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DOCTORS':
            return {
                ...state,
                doctors: action.payload // Store user data
            };
        default:
            return state;
    }
};

export default doctorsReducer
