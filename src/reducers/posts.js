import { OBJ } from '../utils/constants';
import { ById } from '../utils/data';
import { 
  LIST_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/types';


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

  [EDIT_POST]: (state, action) => {
    const { byId: posts } = state;
    const { post } = action;
    const old = posts[post.id];
    const byId = Object.assign({}, posts,  {
      [post.id]: Object.assign({}, old, post),
    });

    return Object.assign({}, state, {
      byId,
    });
  },

  [DELETE_POST]: (state, action) => {
    const { byId: posts } = state;
    const { post } = action;
    const byId = Object.assign({}, posts);
    delete byId[post.id];

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
