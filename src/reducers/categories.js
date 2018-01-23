import { OBJ } from '../utils/constants';
import { LIST_CATEGORIES } from '../actions/types';

// ------------------------------------
// CATEGORIES Reducer
// ------------------------------------

const ACTION_HANDLERS = {
  [LIST_CATEGORIES]: (state, action) => {
    const { categories } = action;
    const byName = categories.reduce((p, c) => {
      p[c.name] = c;
      return p;
    }, {});

    return Object.assign({}, state , {
      byName,
      fetched: true,
    });
  },
};

const initialState = {
  byName: OBJ,
  fetched: false,
};

export default function categoriesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
