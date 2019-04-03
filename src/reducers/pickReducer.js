import {CLICK_PATIENT} from '../actions/types';

const INITIAL_STATE = {
  clickedPatient: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CLICK_PATIENT:
      return {...state, clickedPatient: action.payload};
    default:
      return state;
  }
};