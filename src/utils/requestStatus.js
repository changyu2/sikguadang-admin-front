const _REQUEST = '_REQUEST';
const _PENDING = '_PENDING';
const _FULFILLED = '_FULFILLED';
const _REJECTED = '_REJECTED';

const request = {
  fetching: false,
  fetched: false,
  error: null
};
const pending = {
  fetching: true,
  fetched: false,
  error: null
};
const fulfilled = {
  fetching: false,
  fetched: true,
  error: null
};
const rejected = {
  fetching: false,
  fetched: false
};

export {
  _REQUEST,
  _PENDING,
  _FULFILLED,
  _REJECTED,
  request,
  pending,
  fulfilled,
  rejected
};
