import { combineReducers } from 'redux';

import auth from './auth';
import jipijigi from './jipijigi';
import images from './images';

export default combineReducers({
  auth,
  jipijigi,
  images
});
