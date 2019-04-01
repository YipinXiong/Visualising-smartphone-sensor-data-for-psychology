import { 
  SIGN_IN,
  SIGN_OUT,
  FETCH_PATIENT,
  FETCH_PATIENTS 
 } from './types';

// import history from '../history';

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