import { OBJ } from '../utils/constants';

export const MODAL_EDIT = 'MODAL_EDIT';
export const MODAL_ADD = 'MODAL_ADD';
export const MODAL_HIDE = 'MODAL_HIDE';

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
