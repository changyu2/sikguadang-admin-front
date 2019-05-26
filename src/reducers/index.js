import { combineReducers } from 'redux';

import auth from './auth';
import notices from './notices';
import inquiries from './inquiries';
import orders from './orders';
import stores from './stores';
import articles from './articles';
import images from './images';

export default combineReducers({
  auth,
  notices,
  inquiries,
  orders,
  stores,
  articles,
  images
});
