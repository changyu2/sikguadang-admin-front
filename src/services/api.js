import request from '../utils/request';

export const login = (email, password) => {
  let data = {
    email,
    password
  };

  return request({
    url: '/v1/authors/login',
    method: 'POST',
    data
  });
};

export const getJipijigiList = (offset, limit) => {
  return request({
    url: `/v1/jipijigi?offset=${offset}&limit=${limit}`,
    method: 'GET',
    data: {}
  });
};

export const postJipijigi = data => {
  return request({
    url: '/v1/jipijigi',
    method: 'POST',
    data: data
  });
};

export const editJipijigi = (jipijigiId, data) => {
  return request({
    url: `/v1/jipijigi/${jipijigiId}`,
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
