import merge from 'deepmerge';

const reducer = (state = { enabled: true }, action) => {
  switch (action.type) {
    case 'LANDSCAPE_BLOCKER:ENABLE':
      return merge(state, { enabled: action.bool });
    default:
      return state;
  }
};

const actions = {
  enable: (bool) => (dispatch) => {
    if (bool) {
      dispatch({
        type: 'LANDSCAPE_BLOCKER:ENABLE',
        bool
      });
    } else {
      setTimeout(() => {
        dispatch({
          type: 'LANDSCAPE_BLOCKER:ENABLE',
          bool
        });
      }, 500);
    }
  }
};

const selectors = {
  enabled: (state) => state.landscapeBlocker.enabled
};

export default {
  reducer,
  actions,
  selectors
};
