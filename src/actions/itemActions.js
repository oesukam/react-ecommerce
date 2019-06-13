import * as types from '../actions-types/itemActionsTypes';
import axios from '../utils/axios';

export const setItems = payload => ({
  type: types.SET_ITEMS,
  payload,
});

export const setLoadingItems = payload => ({
  type: types.SET_LOADING_ITEMS,
  payload,
});

export const setItemError = payload => ({
  type: types.SET_ITEM_ERROR,
  payload,
});

export const setDepartments = payload => ({
  type: types.SET_DEPARTMENTS,
  payload,
});

export const setCategories = payload => ({
  type: types.SET_CATEGORIES,
  payload,
});

export const fetchDepartments = () => dispatch => {
  return axios
    .get('/departments')
    .then(({ data }) => {
      dispatch(setDepartments(data || [])); // Dispatch with an empty in case there is no data
    })
    .catch(err => {
      dispatch(setItemError(err));
    });
};

export const fetchCategories = () => dispatch => {
  return axios
    .get('/categories')
    .then(({ data }) => {
      const { rows = [] } = data;
      dispatch(setCategories(rows)); // Dispatch with an empty in case there is no data
    })
    .catch(err => {
      dispatch(setItemError(err));
    });
};

export const fetchItems = () => dispatch => {
  dispatch(setLoadingItems(true));
  return axios
    .get('/products')
    .then(({ data }) => {
      const { rows = [] } = data;
      dispatch(setItems(rows));
      dispatch(setLoadingItems(false));
    })
    .catch(err => {
      dispatch(setItemError(err));
      dispatch(setLoadingItems(false));
    });
};
