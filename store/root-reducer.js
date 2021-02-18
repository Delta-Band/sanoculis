import { combineReducers } from 'redux';
import { helmet, cms, section } from './index';

const rootReducer = combineReducers({
  helmet: helmet.reducer,
  cms: cms.reducer,
  section: section.reducer
});

export default rootReducer;
