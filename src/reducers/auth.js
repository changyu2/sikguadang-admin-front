import types from '../actions/actionTypes/auth';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  authorList: [],
  requests: {
    me: {
      ...rs.request
    },
    login: {
      ...rs.request
    }
  }
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.ME + rs._PENDING:
      return update(state, {
        requests: {
          me: { $set: rs.pending }
        }
      });
    case types.ME + rs._FULFILLED:
      return update(state, {
        authorList: { $set: action.payload.data },
        requests: {
          me: { $set: rs.fulfilled }
        }
      });
    case types.ME + rs._REJECTED:
      return update(state, {
        requests: {
          me: { $set: { ...rs.rejected, error: action.payload } }
        }
      });
    case types.LOGIN + rs._PENDING:
      return update(state, {
        requests: {
          login: { $set: rs.pending }
        }
      });
    case types.LOGIN + rs._FULFILLED:
      return update(state, {
        requests: {
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
