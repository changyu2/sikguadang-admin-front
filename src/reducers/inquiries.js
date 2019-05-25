import types from '../actions/actionTypes/inquiries';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  inquiryList: [],
  inquiryListEnd: false,
  requests: {
    getInquiryList: {
      ...rs.request
    },

    editInquiry: {
      ...rs.request
    }
  }
};

export default function inquiries(state = initialState, action) {
  switch (action.type) {
    case types.GET_INQUIRIES_LIST + rs._PENDING:
      return update(state, {
        requests: {
          getInquiryList: { $set: rs.pending }
        }
      });
    case types.GET_INQUIRIES_LIST + rs._FULFILLED:
      return update(state, {
        inquiryList: { $set: action.payload.data },
        requests: {
          getInquiryList: { $set: rs.fulfilled }
        }
      });
    case types.GET_INQUIRIES_LIST + rs._REJECTED:
      return update(state, {
        requests: {
          getInquiryList: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.EDIT_INQUIRY + rs._PENDING:
      return update(state, {
        requests: {
          editInquiry: { $set: rs.pending }
        }
      });
    case types.EDIT_INQUIRY + rs._FULFILLED:
      return update(state, {
        requests: {
          editInquiry: { $set: rs.fulfilled }
        }
      });
    case types.EDIT_INQUIRY + rs._REJECTED:
      return update(state, {
        requests: {
          editInquiry: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    default:
      return state;
  }
}
