import types from '../actions/actionTypes/auth';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  requests: {
    login: {
      ...rs.request
    }
  }
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN + rs._PENDING:
      return update(state, {
        requests: {
          login: { $set: rs.pending }
        }
      });
    case types.LOGIN + rs._FULFILLED:
      return update(state, {
        requests: {
          ...state.requests,
          login: { $set: rs.fulfilled }
        }
      });
    case types.LOGIN + rs._REJECTED:
      return update(state, {
        requests: {
          login: { $set: { ...rs.rejected, error: action.payload } }
        }
      });
    default:
      return state;
  }
}
