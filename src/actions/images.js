import types from './actionTypes/images';
import * as api from '../services/api';

export const postTempImages = data => ({
  type: types.POST_TEMP_IMAGES,
  payload: {
    promise: api.postTempImages(data).then(response => {
      return new Promise((resolve, reject) => {
        let tempKeyArray = response.data;
        if (!(tempKeyArray.length > 0)) {
          let err = new Error('Returned 0 results from temp image upload');
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    })
  }
});
