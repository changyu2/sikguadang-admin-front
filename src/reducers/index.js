import { combineReducers } from 'redux';

import auth from './auth';
import notices from './notices';
import inquiries from './inquiries';
import stores from './stores';
import articles from './articles';
import images from './images';

export default combineReducers({
  auth,
  notices,
  inquiries,
  stores,
  articles,
  images
});
