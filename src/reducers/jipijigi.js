import types from '../actions/actionTypes/jipijigi';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  jipijigiList: [],
  jipijigiListEnd: false,
  requests: {
    getJipijigiList: {
      ...rs.request
    },
    postJipijigi: {
      ...rs.request
    },
    editJipijigi: {
      ...rs.request
    }
  }
};

export default function jipijigi(state = initialState, action) {
  switch (action.type) {
    case types.GET_JIPIJIGI_LIST + rs._PENDING:
      return update(state, {
        requests: {
          getJipijigiList: { $set: rs.pending }
        }
      });
    case types.GET_JIPIJIGI_LIST + rs._FULFILLED:
      return update(state, {
        jipijigiList: { $set: action.payload.data },
        requests: {
          getJipijigiList: { $set: rs.fulfilled }
        }
      });
    case types.GET_JIPIJIGI_LIST + rs._REJECTED:
      return update(state, {
        requests: {
          getJipijigiList: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.POST_JIPIJIGI + rs._PENDING:
      return update(state, {
        requests: {
          postJipijigi: { $set: rs.pending }
        }
      });
    case types.POST_JIPIJIGI + rs._FULFILLED:
      return update(state, {
        requests: {
          postJipijigi: { $set: rs.fulfilled }
        }
      });
    case types.POST_JIPIJIGI + rs._REJECTED:
      return update(state, {
        requests: {
          postJipijigi: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.EDIT_JIPIJIGI + rs._PENDING:
      return update(state, {
        requests: {
          editJipijigi: { $set: rs.pending }
        }
      });
    case types.EDIT_JIPIJIGI + rs._FULFILLED:
      return update(state, {
        requests: {
          editJipijigi: { $set: rs.fulfilled }
        }
      });
    case types.EDIT_JIPIJIGI + rs._REJECTED:
      return update(state, {
        requests: {
          editJipijigi: { $set: { ...rs.rejected, error: action.payload } }
        }
      });
    default:
      return state;
  }
}
