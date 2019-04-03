import { 
  SIGN_IN,
  SIGN_OUT,
  FETCH_PATIENT,
  FETCH_PATIENTS,
  CLICK_PATIENT 
 } from './types';

 import jsonPlaceHolder from '../api';

export const signIn = userId =>{
  return {
    type: SIGN_IN,
    payload: userId
  };
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const fetchPatients = () => async dispatch => {
  const { data } = await jsonPlaceHolder.get('/users');
  dispatch({
    type: FETCH_PATIENTS,
    payload: data 
  });
}

export const fetchPatient = patientId => async dispatch => {
  const { data } = await jsonPlaceHolder.get(`/users/${patientId}`);
  dispatch({
    type: FETCH_PATIENT,
    payload: data
  })
}

export const clickPatient = patientId => {
  return {type: CLICK_PATIENT, payload: patientId}
}