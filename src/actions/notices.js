import types from './actionTypes/notices';
import * as api from '../services/api';

export const getNoticeList = (offset, limit) => ({
  type: types.GET_NOTICES_LIST,
  payload: {
    promise: api.getNoticeList(offset, limit)
  }
});
export const postNotice = data => ({
  type: types.POST_NOTICE,
  payload: {
    promise: api.postNotice(data)
  }
});
export const editNotice = (noticeId, data) => ({
  type: types.EDIT_NOTICE,
  payload: {
    promise: api.editNotice(noticeId, data)
  }
});
