import types from '../actions/actionTypes/orders';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  orderList: [],
  orderListEnd: false,
  requests: {
    getOrdersList: {
      ...rs.request
    },

    editOrder: {
      ...rs.request
    }
  }
};

export default function orders(state = initialState, action) {
  switch (action.type) {
    case types.GET_ORDERS_LIST + rs._PENDING:
      return update(state, {
        requests: {
          getOrdersList: { $set: rs.pending }
        }
      });
    case types.GET_ORDERS_LIST + rs._FULFILLED:
      return update(state, {
        orderList: { $set: action.payload.data },
        requests: {
          getOrdersList: { $set: rs.fulfilled }
        }
      });
    case types.GET_ORDERS_LIST + rs._REJECTED:
      return update(state, {
        requests: {
          getOrdersList: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.EDIT_ORDER + rs._PENDING:
      return update(state, {
        requests: {
          editOrder: { $set: rs.pending }
        }
      });
    case types.EDIT_ORDER + rs._FULFILLED:
      return update(state, {
        requests: {
          editOrder: { $set: rs.fulfilled }
        }
      });
    case types.EDIT_ORDER + rs._REJECTED:
      return update(state, {
        requests: {
          editOrder: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    default:
      return state;
  }
}
