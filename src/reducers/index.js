import { combineReducers } from 'redux';

export default combineReducers({
  auth : authReducer,
  form: formReducer,
  streams: streamReducer
});