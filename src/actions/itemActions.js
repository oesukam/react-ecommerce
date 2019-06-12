import * as types from '../actions-types/itemActionsTypes';

export const setAllItems = payload => ({
  type: types.SET_ALL_ITEMS,
  payload,
});

export const setLoadingItems = payload => ({
  type: types.SET_LOADING_ITEMS,
  payload,
});
