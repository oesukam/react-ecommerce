import * as types from '../actions-types/itemActionsTypes';
import axios from '../utils/axios';
import groupArray from '../utils/groupArray';
import getMetaData from '../utils/getMetaData';
import getError from '../utils/getError';
import { fetchCartProduct, submitCartProduct } from './cartActions';

export const setItem = payload => ({
  type: types.SET_ITEM,
  payload,
});

export const setItems = payload => ({
  type: types.SET_ITEMS,
  payload,
});

export const setLoadingItem = payload => ({
  type: types.SET_LOADING_ITEM,
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

export const setSearchingItems = payload => ({
  type: types.SET_SEARCHING_ITEMS,
  payload,
});

export const setSearchedItems = payload => ({
  type: types.SET_SEARCHED_ITEMS,
  payload,
});


export const setDepartmentId = payload => ({
  type: types.SET_DEPARTMENT_ID,
  payload,
});

export const setCategoryId = payload => ({
  type: types.SET_CATEGORY_ID,
  payload,
});

export const setItemForm = payload => ({
  type: types.SET_ITEM_FORM,
  payload,
});

export const setItemFormField = payload => ({
  type: types.SET_ITEM_FORM_FIELD,
  payload,
});

export const setItemAttributes = payload => ({
  type: types.SET_ITEM_ATTRIBUTES,
  payload,
});


export const addingItemToCart = payload => ({
  type: types.ADDING_ITEM_TO_CART,
  payload,
});

export const fetchDepartments = () => dispatch => {
  return axios
    .get('/departments')
    .then(({ data }) => {
      dispatch(setDepartments(data));
    })
    .catch(err => {
      const error = getError(err);
      dispatch(setItemError(error));
    });
};

export const fetchCategories = () => dispatch => {
  return axios
    .get('/categories')
    .then(({ data }) => {
      dispatch(setCategories(data.rows)); // Dispatch with an empty in case there is no data
    })
    .catch(err => {
      const error = getError(err);
      dispatch(setItemError(error));
    });
};

export const fetchItem = id => dispatch => {
  dispatch(setLoadingItem(true));
  return axios
    .get(`/products/${id}`)
    .then(({ data }) => {
      dispatch(setItem(data));
      dispatch(setLoadingItem(false));
      return data;
    })
    .catch(err => {
      dispatch(setItemError(getError(err)));
      dispatch(setLoadingItem(false));
    });
};

export const fetchItemAttributes = id => dispatch => {
  return axios
    .get(`/attributes/inProduct/${id}`)
    .then(({ data }) => {
      const dataClearn = groupArray(data, 'attribute_name');
      dispatch(setItemAttributes(dataClearn));
      return data;
    })
    .catch(err => {
      const error = getError(err);
      dispatch(setItemError(error));
    });
};


export const addItemToCart = ({ itemId, cartId }) => dispatch => {
  const cart = {
    cart_id: cartId,
    product_id: itemId,
    quantity: 1,
    attributes: '',
  };

  dispatch(addingItemToCart({ itemId, adding: true }));
  return dispatch(submitCartProduct(cart))
    .then(() => {
      dispatch(addingItemToCart({ itemId, adding: false }));
      dispatch(fetchCartProduct(cartId));
    })
};

export const searchProducts = keywords => dispatch => {
  dispatch(setSearchingItems(true));
  dispatch(setSearchedItems([]));
  return axios
    .get(`/products/search?limit=5&query_string=${keywords}`)
    .then(({ data }) => {
      dispatch(setSearchedItems(data.rows));
      dispatch(setSearchingItems(false));
      return data;
    })
    .catch(err => {
      dispatch(setSearchingItems(false));
      dispatch(setSearchedItems([]));
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
      const { rows, count } = data;
      const meta = getMetaData({ page, count });
      dispatch(setItems({ rows, meta }));
      dispatch(setLoadingItems(false));
    })
    .catch(err => {
      const error = getError(err);
      dispatch(setItemError(error));
      dispatch(setLoadingItems(false));
    });
};
