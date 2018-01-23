import { OBJ } from '../utils/constants';
import {
  MODAL_ADD,
  MODAL_EDIT,
  MODAL_HIDE,
} from '../actions/types';
// ------------------------------------
// Reducer MODAL
// ------------------------------------

const ACTION_HANDLERS = {
  [MODAL_EDIT]: (state, action) => {
    return Object.assign({}, state, {
      isOn: true,
      action: 'EDIT',
      data: action.post,
    });
  },

  [MODAL_ADD]: (state) => {
    return Object.assign({}, state, {
      isOn: true,
      action: 'ADD',
    });
  },

  [MODAL_HIDE]: (state) => {
    return initialState;
  },
};

const initialState = { isOn: false, action: '', data: OBJ };

export default function reducerName(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
