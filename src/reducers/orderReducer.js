import * as types from '../actions-types/orderActionsTypes';
import { order as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CLEARING_ORDER:
      return {
        ...state,
        clearingOrder: payload,
      };
    case types.SET_LOADING_ORDER:
      return {
        ...state,
        loadingOrder: payload,
      };
    case types.SET_SUBMITTING_ORDER:
      return {
        ...state,
        submittingOrder: payload,
      };
    case types.SET_LOADING_ORDERS:
      return {
        ...state,
        loadingOrders: payload,
      };
    case types.SET_ORDERS:
      return {
        ...state,
        orders: payload,
      };

    case types.SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    case types.SET_ALL_TAX:
      return {
        ...state,
        allTax: payload,
      };

    case types.SET_SINGLE_TAX:
      return {
        ...state,
        tax: payload,
      };
    case types.SET_ORDER_FORM:
      return {
        ...state,
        orderForm: payload,
      };
    case types.SET_ORDER_FORM_FIELD:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          [payload.name]: payload.value,
        },
      };
    case types.CLEAR_ORDER_FORM:
      return {
        ...state,
        orderForm: {
          ...initialState.orderForm,
          order_id: state.orderForm.order_id,
        },
      };
    case types.SET_ORDER_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.SET_ORDER_MODAL:
      return {
        ...state,
        orderModal: payload,
        submittingOrder: false,
        orderStep: 'Delivery',
      };
    case types.SET_ORDER_STEP:
      return {
        ...state,
        orderStep: payload,
        submittingOrder: false,
      };
    case types.SET_STRIPE_TOKEN:
      return {
        ...state,
        stripeToken: payload,
      };
    default:
      return state;
  }
};

export default reducer;
