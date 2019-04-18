import types from '../actions/actionTypes/notices';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  noticeList: [],
  noticeListEnd: false,
  requests: {
    getNoticeList: {
      ...rs.request
    },
    postNotice: {
      ...rs.request
    },
    editNotice: {
      ...rs.request
    }
  }
};

export default function notices(state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTICES_LIST + rs._PENDING:
      return update(state, {
        requests: {
          getNoticeList: { $set: rs.pending }
        }
      });
    case types.GET_NOTICES_LIST + rs._FULFILLED:
      return update(state, {
        noticeList: { $set: action.payload.data },
        requests: {
          getNoticeList: { $set: rs.fulfilled }
        }
      });
    case types.GET_NOTICES_LIST + rs._REJECTED:
      return update(state, {
        requests: {
          getNoticeList: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.POST_NOTICE + rs._PENDING:
      return update(state, {
        requests: {
          postNotice: { $set: rs.pending }
        }
      });
    case types.POST_NOTICE + rs._FULFILLED:
      return update(state, {
        requests: {
          postNotice: { $set: rs.fulfilled }
        }
      });
    case types.POST_NOTICE + rs._REJECTED:
      return update(state, {
        requests: {
          postNotice: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.EDIT_NOTICE + rs._PENDING:
      return update(state, {
        requests: {
          editNotice: { $set: rs.pending }
        }
      });
    case types.EDIT_NOTICE + rs._FULFILLED:
      return update(state, {
        requests: {
          editNotice: { $set: rs.fulfilled }
        }
      });
    case types.EDIT_NOTICE + rs._REJECTED:
      return update(state, {
        requests: {
          editNotice: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    default:
      return state;
  }
}
