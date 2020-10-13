import { combineReducers } from 'redux';
import { helmet, cms, device, contact, footer, video, section } from './index';

const rootReducer = combineReducers({
  helmet: helmet.reducer,
  cms: cms.reducer,
  device: device.reducer,
  contact: contact.reducer,
  footer: footer.reducer,
  video: video.reducer,
  section: section.reducer
});

export default rootReducer;
