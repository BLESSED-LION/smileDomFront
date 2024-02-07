// store/reducers/authReducer.js
const initialState = {
    doctors: [],
};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DOCTOR':
            return {
                ...state,
                doctors: action.payload // Store user data
            };
        default:
            return state;
    }
};

export default doctorReducer
