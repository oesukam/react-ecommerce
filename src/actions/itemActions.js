import * as types from '../actions-types/itemActionsTypes';
import axios from '../utils/axios';
import getMetaData from '../utils/getMetaData';

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

export const fetchItems = ({
  categoryId,
  departmentId,
  type,
  page = 1,
} = {}) => dispatch => {
  dispatch(setLoadingItems(true));
  let endpoint = '/products';
  let query = `?limit=20&page=${page}`;
  // Set the corresponding endpoint
  switch (type) {
    case 'department':
      endpoint = `${endpoint}/inDepartment/${departmentId}${query}`;
      break;
    case 'category':
      endpoint = `${endpoint}/inCategory/${categoryId}${query}`;
      break;
    default:
      endpoint = endpoint + query;
      break;
  }
  return axios
    .get(endpoint)
    .then(({ data }) => {
      const { rows = [], count = 0 } = data;
      const meta = getMetaData({ page, count });
      dispatch(setItems({ rows, meta }));
      dispatch(setLoadingItems(false));
    })
    .catch(err => {
      dispatch(setItemError(err));
      dispatch(setLoadingItems(false));
    });
};

export const setDepartmentId = payload => ({
  type: types.SET_DEPARTMENT_ID,
  payload,
});

export const setCategoryId = payload => ({
  type: types.SET_CATEGORY_ID,
  payload,
});
