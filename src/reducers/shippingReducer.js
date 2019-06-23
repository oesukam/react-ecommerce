import * as types from '../actions-types/shippingActionsTypes';
import {
  shipping as initialState
} from '../store/initialState';

const reducer = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case types.SET_LOADING_SHIPPING_REGION:
      return {
        ...state,
        loadingRegion: payload,
      };
    case types.SET_LOADING_SHIPPING_REGIONS:
      return {
        ...state,
        loadingRegions: payload,
      };
    case types.SET_SHIPPING_REGION:
      return {
        ...state,
        region: payload,
      };
    case types.SET_SHIPPING_REGIONS:
      return {
        ...state,
        regions: payload,
      };
    default:
      return state;
  }
};

export default reducer;