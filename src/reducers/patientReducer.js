import { FETCH_PATIENTS , FETCH_PATIENT} from '../actions/types'

import _ from 'lodash';

export default (state= {}, action) => {
  switch(action.type) {
    case FETCH_PATIENTS:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    case FETCH_PATIENT:
      return {...state, [action.payload.id]: action.payload};
    default:
      return state;
  }
}