import { OBJ } from '../utils/constants';
import { ById } from '../utils/data';
import {
  LIST_COMMENTS,
  CLEAR_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
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

  [ADD_COMMENT]: (state, action) => {
    const { byId: comments } = state;
    const byId = ById(
      Object.values(comments).concat(action.comment)
    );

    return Object.assign({}, state, {
      byId,
    });
  },

  [EDIT_COMMENT]: (state, action) => {
    const { byId: comments } = state;
    const { comment } = action;
    const old = comments[comment.id];
    const byId = Object.assign({}, comments,  {
      [comment.id]: Object.assign({}, old, comment),
    });

    return Object.assign({}, state, {
      byId,
    });
  },

  [DELETE_COMMENT]: (state, action) => {
    const { byId: comments } = state;
    const { comment } = action;
    const byId = Object.assign({}, comments);
    delete byId[comment.id];

    return Object.assign({}, state, {
      byId,
    });
  },

  [CLEAR_COMMENTS]: () => initialState,
};

const initialState = { byId: OBJ, fetched: false };

export default function comments(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
