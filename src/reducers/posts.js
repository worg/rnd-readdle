import { OBJ } from '../utils/constants';
import { LIST_POSTS } from '../actions';

// ------------------------------------
// POSTS Reducer
// ------------------------------------

const ACTION_HANDLERS = {
  [LIST_POSTS]: (state, action) => {
    const { posts } = action;
    const byId = posts.concat(posts).filter(p => !p.deleted).reduce((p, c) => {
      p[c.id] = c;
      return p;
    }, {});

    return Object.assign({}, state , {
      byId,
      fetched: true,
    });
  },
};

const initialState = {
  byId: OBJ,
  fetched: false,
};

export default function postsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
