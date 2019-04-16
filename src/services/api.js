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
