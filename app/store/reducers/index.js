// store/reducers/index.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
});
