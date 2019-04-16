import types from './actionTypes/auth';
import * as api from '../services/api';

export const login = (email, password) => ({
  type: types.LOGIN,
  payload: {
    promise: api.login(email, password).then(response => {
      return new Promise((resolve, reject) => {
        localStorage.sat = response.headers['x-sikguadang-admin-token'];
        localStorage.sar = response.headers['x-sikguadang-admin-restore'];
        return resolve(response);
      });
    })
  }
});
