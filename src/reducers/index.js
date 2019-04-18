import { combineReducers } from 'redux';

import auth from './auth';
import notices from './notices';
import stores from './stores';
import jipijigi from './jipijigi';
import images from './images';

export default combineReducers({
  auth,
  notices,
  stores,
  jipijigi,
  images
});
