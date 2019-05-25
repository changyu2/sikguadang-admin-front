import types from './actionTypes/inquiries';
import * as api from '../services/api';

export const getInquiriesList = (offset, limit) => ({
  type: types.GET_INQUIRIES_LIST,
  payload: {
    promise: api.getInquiriesList(offset, limit)
  }
});

export const editInquiry = (inquiryId, data) => ({
  type: types.EDIT_INQUIRY,
  payload: {
    promise: api.editInquiry(inquiryId, data)
  }
});
