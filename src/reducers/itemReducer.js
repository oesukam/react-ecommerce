import * as types from '../actions-types/itemActionsTypes';
import { item as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_LOADING_ITEMS:
      return {
        ...state,
        loadingItems: payload,
      };
    case types.SET_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case types.SET_ITEM_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.SET_DEPARTMENTS:
      return {
        ...state,
        departments: payload,
      };
    case types.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

    default:
      return state;
  }
};

export default reducer;
