// store/actions.js
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });

// auth actions
export const loginSuccess = (user) => ({ type: 'LOGIN_SUCCESS', payload: user });
export const logout = () => ({ type: 'LOGOUT' });

// user actions
export const getUserInfo = (user) => ({ type: 'GET_USER', payload: user });
export const getDoctorInfo = (doctors) => ({ type: 'GET_DOCTOR', payload: doctors });
export const getMessages = (messages) => ({ type: 'GET_MESSAGES', payload: messages });
