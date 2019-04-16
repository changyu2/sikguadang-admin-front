import types from './actionTypes/jipijigi';
import * as api from '../services/api';

export const getJipijigiList = (offset, limit) => ({
  type: types.GET_JIPIJIGI_LIST,
  payload: {
    promise: api.getJipijigiList(offset, limit)
  }
});

export const postJipijigi = data => ({
  type: types.POST_JIPIJIGI,
  payload: {
    promise: api.postJipijigi(data)
  }
});

export const editJipijigi = (storyId, data) => ({
  type: types.EDIT_JIPIJIGI,
  payload: {
    promise: api.editJipijigi(storyId, data)
  }
});
