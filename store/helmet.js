const reducer = (
  state = {
    tabTitle: 'Nucleai',
    metaDescription:
      'Nucleai is a leading provider of AI-powered platform transforming biomarker discovery and treatment decisions.'
  },
  action
) => {
  switch (action.type) {
    case 'HOME:UPDATE':
      return action.data;
    default:
      return state;
  }
};

const actions = {
  update: (data) => (dispatch) =>
    dispatch({
      type: 'HOME:UPDATE',
      data
    })
};

const selectors = {
  data: (state) => state.helmet
};

export default {
  reducer,
  actions,
  selectors
};
