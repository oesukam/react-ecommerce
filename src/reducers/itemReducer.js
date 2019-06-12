import * as types from '../actions-types/itemActionsTypes';
import { item as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_LOADING_ITEMS:
      return {
        ...state,
        loadingItems: payload,
      };
    case types.SET_LOADING_ALL_ITEMS:
      return {
        ...state,
        loadingAllItems: payload,
      };
    case types.SET_ALL_ITEMS:
      return {
        ...state,
        allItems: payload,
      };
    case types.SET_ITEMS:
      return {
        ...state,
        allItems: payload,
      };

    default:
      return state;
  }
};

export default reducer;
