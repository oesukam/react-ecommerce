import * as types from '../actions-types/cartActionsTypes';
import axios from '../utils/axios';

export const setCartModal = payload => ({
  type: types.SET_CART_MODAL,
  payload,
});

export const setCartProduct = payload => ({
  type: types.SET_CART_PRODUCT,
  payload,
});

export const setCartProducts = payload => ({
  type: types.SET_CART_PRODUCTS,
  payload,
});

export const setLoadingCartProduct = payload => ({
  type: types.SET_LOADING_CART_PRODUCT,
  payload,
});

export const setLoadingCartProducts = payload => ({
  type: types.SET_LOADING_CART_PRODUCTS,
  payload,
});

export const setSubmittingCartProduct = payload => ({
  type: types.SET_SUBMITTING_CART_PRODUCT,
  payload,
});

export const setCartProductError = payload => ({
  type: types.SET_CART_ERROR,
  payload,
});

export const fetchCartProducts = cartId => dispatch => {
  dispatch(setLoadingCartProducts(true));
  return axios
    .get(`/shoppingcart/${cartId}`)
    .then(({ data }) => {
      dispatch(setCartProducts(data));
      dispatch(setLoadingCartProducts(false));
    })
    .catch(err => {
      dispatch(setCartProductError(err));
      dispatch(setLoadingCartProducts(false));
    });
};

export const clearCartProductForm = payload => ({
  type: types.CLEAR_CART_PRODUCT_FORM,
  payload,
});

export const setCartProductForm = payload => ({
  type: types.SET_CART_PRODUCT_FORM,
  payload,
});

export const setCartProductFormField = payload => ({
  type: types.SET_CART_PRODUCT_FORM_FIELD,
  payload,
});

export const generateCartId = () => dispatch => {
  return axios
    .get('/shoppingcart/generateUniqueId')
    .then(({ data }) => {
      dispatch(
        setCartProductFormField({ name: 'cart_id', value: data.cart_id }),
      );
      return data;
    })
    .catch(err => {
      dispatch(setCartProductError(err));
    });
};

export const fetchCartProduct = cartId => dispatch => {
  dispatch(setLoadingCartProduct(true));
  return axios
    .get(`/shoppingcart/${cartId}`)
    .then(({ data }) => {
      dispatch(setCartProduct(data));
      dispatch(setLoadingCartProduct(false));
      dispatch(fetchCartTotalAmount(cartId));
      return data;
    })
    .catch(err => {
      dispatch(setCartProductError(err));
      dispatch(setLoadingCartProduct(false));
    });
};

export const setCartTotalAmount = payload => ({
  type: types.SET_CART_TOTAL_AMOUNT,
  payload,
});

export const fetchCartTotalAmount = cartId => dispatch => {
  return axios
    .get(`/shoppingcart/totalAmount/${cartId}`)
    .then(({ data }) => {
      dispatch(setCartTotalAmount(data.total_amount || 0));
      return data;
    })
    .catch(err => {
      dispatch(setCartProductError(err));
    });
};

export const updateCartProduct = payload => ({
  type: types.UPDATE_CART_ITEM,
  payload,
});

export const submitCartProduct = cart => dispatch => {
  dispatch(setSubmittingCartProduct(true));
  return axios
    .post(`/shoppingcart/add`, cart)
    .then(({ data }) => {
      dispatch(setCartProducts(data));
      dispatch(clearCartProductForm());
      dispatch(setSubmittingCartProduct(false));
      dispatch(fetchCartTotalAmount(cart.cart_id));
      return data;
    })
    .catch(err => {
      dispatch(setCartProductError(err));
      dispatch(setSubmittingCartProduct(false));
    });
};

export const submitCartProductUpdate = ({
  cartId,
  itemId,
  item,
}) => dispatch => {
  return axios
    .put(`/shoppingcart/update/${itemId}/`, item)
    .then(({ data }) => {
      dispatch(updateCartProduct({ itemId, item }));
      dispatch(fetchCartTotalAmount(cartId));
      return data;
    })
    .catch(err => {
      dispatch(setCartProductError(err));
    });
};

export const setDeleletingCartItem = payload => ({
  type: types.SET_DELETING_CART_ITEM,
  payload,
});

export const deleteCartItem = payload => ({
  type: types.DELETE_CART_ITEM,
  payload,
});

export const submitDeleteCartItem = itemId => dispatch => {
  dispatch(setDeleletingCartItem(itemId));
  return axios.delete(`/shoppingcart/removeProduct/${itemId}`).then(() => {
    dispatch(deleteCartItem(itemId));
  });
};

export const clearingCart = payload => ({
  type: types.CLEARING_CART,
  payload,
});

export const submitEmptyCart = cartId => dispatch => {
  dispatch(clearingCart(true));
  return axios
    .delete(`/shoppingcart/empty/${cartId}`)
    .then(({ data }) => {
      dispatch(setCartProducts(data || []));
      dispatch(clearingCart(false));
    })
    .catch(() => {
      dispatch(clearingCart(false));
    });
};
