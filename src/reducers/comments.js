import { OBJ } from '../utils/constants';
import { ById } from '../utils/data';
import {
  LIST_COMMENTS
} from '../actions';

// ------------------------------------
// Comments Reducer
// ------------------------------------

const ACTION_HANDLERS = {
  [LIST_COMMENTS]: (state, action) => {
    const { comments } = action;
    const byId = ById(comments);

    return Object.assign({}, state , {
      byId,
      fetched: true,
    });
  },
};

const initialState = { byId: OBJ, fetched: false }

export default function comments(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
