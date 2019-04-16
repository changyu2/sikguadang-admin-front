import { combineReducers } from 'redux';

import auth from './auth';
import stores from './stores';
import jipijigi from './jipijigi';
import images from './images';

export default combineReducers({
  auth,
  stores,
  jipijigi,
  images
});
