import { OBJ } from '../utils/constants';
import { 
  LIST_POSTS,
  ADD_POST,
} from '../actions';

const ById = (posts) => posts.filter(p => !p.deleted).reduce((p, c) => {
  p[c.id] = c;
  return p;
}, {});

// ------------------------------------
// POSTS Reducer
// ------------------------------------

const ACTION_HANDLERS = {
  [LIST_POSTS]: (state, action) => {
    const { posts } = action;
    const byId = ById(posts);

    return Object.assign({}, state , {
      byId,
      fetched: true,
    });
  },

  [ADD_POST]: (state, action) => {
    const { byId: posts } = state;
    const byId = ById(
      Object.values(posts).concat(action.post)
    );

    return Object.assign({}, state, {
      byId,
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
