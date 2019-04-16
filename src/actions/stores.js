import types from './actionTypes/stores';
import * as api from '../services/api';

export const getStoreItemList = (offset, limit) => ({
  type: types.GET_STORES_LIST,
  payload: {
    promise: api.getStoreItemList(offset, limit)
  }
});
export const postStoreItem = data => ({
  type: types.POST_STORE,
  payload: {
    promise: api.postStoreItem(data)
  }
});
export const editStoreItem = (storeItemId, data) => ({
  type: types.EDIT_STORE,
  payload: {
    promise: api.editStoreItem(storeItemId, data)
  }
});
