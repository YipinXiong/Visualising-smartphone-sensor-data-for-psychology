import { combineReducers } from 'redux';
import authReducer from './authReducer';
import patientReducer from './patientReducer';
import pickReducer from './pickReducer';

export default combineReducers({
  auth : authReducer,
  patients: patientReducer,
  currentPatient: pickReducer
});