import axios from 'axios';
/*
Returns a Axios Request Promise
*/
export default function request({ url, method = 'get', data }) {
  let config = {
    headers: {
      'x-sikguadang-admin-token': localStorage.sat,
      'Cache-Control': 'no-cache'
    }
  };

  return axios({
    method,
    url,
    data,
    ...config
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}
