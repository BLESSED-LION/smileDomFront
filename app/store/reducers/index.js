// store/reducers/index.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import messagesReducer from './messagesReducer';
import doctorReducer from './doctorReducer';

export default combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  messages: messagesReducer,
  doctors: doctorReducer,
});
