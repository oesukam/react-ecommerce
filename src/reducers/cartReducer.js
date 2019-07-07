import * as types from '../actions-types/cartActionsTypes';
import { cart as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CLEARING_CART:
      return {
        ...state,
        clearingCart: payload,
      };
    case types.SET_LOADING_CART_PRODUCT:
      return {
        ...state,
        loadingCartProduct: payload,
      };
    case types.SET_SUBMITTING_CART_PRODUCT:
      return {
        ...state,
        submittingCartProduct: payload,
      };
    case types.SET_LOADING_CART_PRODUCTS:
      return {
        ...state,
        loadingCartProducts: payload,
      };
    case types.SET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: payload,
      };
    case types.UPDATE_CART_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.map(item => {
          if (payload.itemId === item.item_id) {
            item = {
              ...item,
              ...payload.item,
            };
          }
          return item;
        }),
      };
    case types.SET_DELETING_CART_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.map(item => {
          if (payload === item.item_id) {
            item.deleting = true;
          }
          return item;
        }),
      };
    case types.DELETE_CART_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          item => item.item_id !== payload,
        ),
      };
    case types.SET_CART_PRODUCT:
      return {
        ...state,
        cartProduct: payload,
      };
    case types.SET_CART_TOTAL_AMOUNT:
      return {
        ...state,
        cartTotalAmount: Number(payload),
      };
    case types.SET_CART_PRODUCT_FORM:
      return {
        ...state,
        cartProductForm: payload,
      };
    case types.SET_CART_PRODUCT_FORM_FIELD:
      return {
        ...state,
        cartProductForm: {
          ...state.cartProductForm,
          [payload.name]: payload.value,
        },
      };
    case types.CLEAR_CART_PRODUCT_FORM:
      return {
        ...state,
        cartProductForm: {
          ...initialState.cartProductForm,
          cart_id: state.cartProductForm.cart_id,
        },
      };
    case types.SET_CART_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.SET_CART_MODAL:
      return {
        ...state,
        cartModal: payload,
      };

    default:
      return state;
  }
};

export default reducer;
