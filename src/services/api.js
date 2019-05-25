import request from '../utils/request';

export const me = () => {
  return request({
    url: `/v1/authors/me`,
    method: 'GET'
  });
};

export const login = (authorId, password) => {
  let data = {
    authorId,
    password
  };

  return request({
    url: '/v1/authors/login',
    method: 'POST',
    data
  });
};

export const getNoticeList = (offset, limit) => {
  return request({
    url: `/v1/notices?offset=${offset}&limit=${limit}`,
    method: 'GET',
    data: {}
  });
};

export const postNotice = data => {
  return request({
    url: '/v1/notices',
    method: 'POST',
    data: data
  });
};

export const editNotice = (noticeId, data) => {
  return request({
    url: `/v1/notices/${noticeId}`,
    method: 'PUT',
    data: data
  });
};

export const getInquiriesList = (offset, limit) => {
  return request({
    url: `/v1/inquiries?offset=${offset}&limit=${limit}`,
    method: 'GET',
    data: {}
  });
};

export const editInquiry = (inquiryId, data) => {
  return request({
    url: `/v1/inquiries/${inquiryId}`,
    method: 'PUT',
    data: data
  });
};

export const getStoreItemList = (offset, limit) => {
  return request({
    url: `/v1/stores?offset=${offset}&limit=${limit}`,
    method: 'GET',
    data: {}
  });
};

export const postStoreItem = data => {
  return request({
    url: '/v1/stores',
    method: 'POST',
    data: data
  });
};

export const editStoreItem = (storeItemId, data) => {
  return request({
    url: `/v1/stores/${storeItemId}`,
    method: 'PUT',
    data: data
  });
};

export const getArticleList = (offset, limit) => {
  return request({
    url: `/v1/articles?offset=${offset}&limit=${limit}`,
    method: 'GET',
    data: {}
  });
};

export const postArticle = data => {
  return request({
    url: '/v1/articles',
    method: 'POST',
    data: data
  });
};

export const editArticle = (jipijigiId, data) => {
  return request({
    url: `/v1/articles/${jipijigiId}`,
    method: 'PUT',
    data: data
  });
};

export const postTempImages = data => {
  return request({
    url: '/v1/images',
    method: 'POST',
    data: data
  });
};
