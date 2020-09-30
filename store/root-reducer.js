import { combineReducers } from 'redux';
import {
  helmet,
  cms,
  device,
  contact,
  footer,
  landscapeBlocker,
  video
} from './index';

const rootReducer = combineReducers({
  helmet: helmet.reducer,
  cms: cms.reducer,
  device: device.reducer,
  contact: contact.reducer,
  footer: footer.reducer,
  video: video.reducer,
  landscapeBlocker: landscapeBlocker.reducer
});

export default rootReducer;
