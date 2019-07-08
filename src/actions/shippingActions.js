import * as types from '../actions-types/shippingActionsTypes';
import axios from '../utils/axios';
import getError from '../utils/getError';

export const setShippingRegion = payload => ({
  type: types.SET_SHIPPING_REGION,
  payload,
});

export const setShippingRegions = payload => ({
  type: types.SET_SHIPPING_REGIONS,
  payload,
});

export const setLoadingShippingRegion = payload => ({
  type: types.SET_LOADING_SHIPPING_REGION,
  payload,
});

export const setLoadingShippingRegions = payload => ({
  type: types.SET_LOADING_SHIPPING_REGIONS,
  payload,
});

export const fetchShippingRegions = () => dispatch => {
  return axios
    .get('/shipping/regions')
    .then(({ data }) => {
      dispatch(setShippingRegions(data));
    })
    .catch(err => getError(err));
};
