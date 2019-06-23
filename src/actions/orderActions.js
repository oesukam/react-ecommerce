import * as types from '../actions-types/orderActionsTypes';
import axios from '../utils/axios';
import stripe from '../utils/stripe';

export const setOrderModal = payload => ({
  type: types.SET_ORDER_MODAL,
  payload,
});

export const setOrderStep = payload => ({
  type: types.SET_ORDER_STEP,
  payload,
});

export const setOrder = payload => ({
  type: types.SET_ORDER,
  payload,
});

export const setOrders = payload => ({
  type: types.SET_ORDERS,
  payload,
});

export const setSingleTax = payload => ({
  type: types.SET_SINGLE_TAX,
  payload,
});

export const setAllTax = payload => ({
  type: types.SET_ALL_TAX,
  payload,
});

export const setLoadingOrder = payload => ({
  type: types.SET_LOADING_ORDER,
  payload,
});

export const setLoadingOrders = payload => ({
  type: types.SET_LOADING_ORDERS,
  payload,
});

export const setSubmittingOrder = payload => ({
  type: types.SET_SUBMITTING_ORDER,
  payload,
});

export const setOrderError = payload => ({
  type: types.SET_ORDER_ERROR,
  payload,
});

export const clearOrderForm = payload => ({
  type: types.CLEAR_ORDER_FORM,
  payload,
});

export const setOrderForm = payload => ({
  type: types.SET_ORDER_FORM,
  payload,
});

export const setOrderFormField = payload => ({
  type: types.SET_ORDER_FORM_FIELD,
  payload,
});


export const setStripeToken = (payload) => ({
  type: types.SET_STRIPE_TOKEN,
  payload,
})

export const clearingOrder = payload => ({
  type: types.CLEARING_ORDER,
  payload,
});

export const fetchOrders = () => dispatch => {
  dispatch(setLoadingOrders(true));
  return axios
    .get('/orders/inCustomer')
    .then(({ data }) => {
      dispatch(setOrders(data));
      dispatch(setLoadingOrders(false));
    })
    .catch(err => {
      dispatch(setOrderError(err));
      dispatch(setLoadingOrders(false));
    });
};

/**
  * @summary Retrieve the cart items
  * @param {Numner} cartId
  * @return {Promise} data
  * @return {Promise} Error
 */
export const fetchOrder = cartId => dispatch => {
  dispatch(setLoadingOrder(true));
  return axios
    .get(`/orders/${cartId}`)
    .then(({ data }) => {
      dispatch(setOrder(data));
      dispatch(setLoadingOrder(false));
      return data;
    })
    .catch(err => {
      dispatch(setOrderError(err));
      dispatch(setLoadingOrder(false));
    });
};

/**
  * @summary Submit the order after a successful checkout
  * @param {Object} order
  * @param {Number} order.cart_id
  * @param {Number} order.shipping_id
  * @param {Number} order.tax_id
  * @return {Promise} data
  * @return {Promise} Error
 */
export const submitOrder = cart => dispatch => {
  dispatch(setSubmittingOrder(true));
  return axios
    .post('/orders', cart)
    .then(({ data }) => {
      dispatch(setOrder(data));
      dispatch(setSubmittingOrder(false));
      return data;
    })
    .catch(err => {
      dispatch(setOrderError(err));
      dispatch(setSubmittingOrder(false));
    });
};

export const fetchAllTax = () => dispatch => {
  return axios
    .get('/tax')
    .then(({ data }) => {
      dispatch(setAllTax(data));
      return data;
    })
    .catch(err => err);
};


/**
  * @summary Submit the payment after an order has been made
  * @param {Object} payment
  * @param {String} payment.stripeToken
  * @param {String} payment.descripion
  * @param {Number} payment.order_id
  * @param {Number} payment.amount
  * @param {String} payment.currency
  * @return {Promise} data
  * @return {Promise} Error
 */
export const submitOrderPayment = payment => dispatch => {
  return axios
    .post('/stripe/charge', { ...payment, amount: payment.amount * 100 })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      dispatch(setOrderError(err));
      return err;
    });
};


export const generateStripToken = card => dispatch => {
  return stripe.createToken(card)
  .then((data) => {
    dispatch(setStripeToken(data));
    return data;
  })
  .catch(err => err);
}
