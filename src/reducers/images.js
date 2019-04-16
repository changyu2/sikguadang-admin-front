import types from '../actions/actionTypes/images';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  requests: {
    postTempImages: {
      ...rs.request
    }
  }
};

export default function images(state = initialState, action) {
  switch (action.type) {
    case types.POST_TEMP_IMAGES + rs._PENDING:
      return update(state, {
        requests: {
          postTempImages: { $set: rs.pending }
        }
      });
    case types.POST_TEMP_IMAGES + rs._FULFILLED:
      return update(state, {
        requests: {
          ...state.requests,
          postTempImages: { $set: rs.fulfilled }
        }
      });
    case types.POST_TEMP_IMAGES + rs._REJECTED:
      return update(state, {
        requests: {
          postTempImages: { $set: { ...rs.rejected, error: action.payload } }
        }
      });
    default:
      return state;
  }
}
