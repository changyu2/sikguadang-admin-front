import types from '../actions/actionTypes/stores';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  storeItemList: [],
  storeItemListEnd: false,
  requests: {
    getStoreItemList: {
      ...rs.request
    },
    postStoreItem: {
      ...rs.request
    },
    editStoreItem: {
      ...rs.request
    }
  }
};

export default function stores(state = initialState, action) {
  switch (action.type) {
    case types.GET_STORES_LIST + rs._PENDING:
      return update(state, {
        requests: {
          getStoreItemList: { $set: rs.pending }
        }
      });
    case types.GET_STORES_LIST + rs._FULFILLED:
      return update(state, {
        storeItemList: { $set: action.payload.data },
        requests: {
          getStoreItemList: { $set: rs.fulfilled }
        }
      });
    case types.GET_STORES_LIST + rs._REJECTED:
      return update(state, {
        requests: {
          getStoreItemList: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.POST_STORE + rs._PENDING:
      return update(state, {
        requests: {
          postStoreItem: { $set: rs.pending }
        }
      });
    case types.POST_STORE + rs._FULFILLED:
      return update(state, {
        requests: {
          postStoreItem: { $set: rs.fulfilled }
        }
      });
    case types.POST_STORE + rs._REJECTED:
      return update(state, {
        requests: {
          postStoreItem: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.EDIT_STORE + rs._PENDING:
      return update(state, {
        requests: {
          editStoreItem: { $set: rs.pending }
        }
      });
    case types.EDIT_STORE + rs._FULFILLED:
      return update(state, {
        requests: {
          editStoreItem: { $set: rs.fulfilled }
        }
      });
    case types.EDIT_STORE + rs._REJECTED:
      return update(state, {
        requests: {
          editStoreItem: { $set: { ...rs.rejected, error: action.payload } }
        }
      });
    default:
      return state;
  }
}
