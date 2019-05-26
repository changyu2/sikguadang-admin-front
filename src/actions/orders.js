import types from './actionTypes/orders';
import * as api from '../services/api';

export const getOrdersList = (offset, limit) => ({
  type: types.GET_ORDERS_LIST,
  payload: {
    promise: api.getOrdersList(offset, limit)
  }
});

export const editOrder = (orderId, data) => ({
  type: types.EDIT_ORDER,
  payload: {
    promise: api.editOrder(orderId, data)
  }
});
