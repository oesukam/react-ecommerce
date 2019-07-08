import * as types from '../actions-types/itemActionsTypes';
import { item as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_LOADING_ITEM:
      return {
        ...state,
        loadingItem: payload,
      };
    case types.SET_LOADING_ITEMS:
      return {
        ...state,
        loadingItems: payload,
      };
    case types.SET_ITEMS:
      return {
        ...state,
        items: payload.rows,
        meta: payload.meta || initialState.meta,
      };
    case types.ADDING_ITEM_TO_CART:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.product_id === payload.itemId) {
            item.adding = payload.adding;
          }
          return item;
        }),
      };
    case types.SET_ITEM:
      return {
        ...state,
        item: payload,
      };
    case types.SET_ITEM_ATTRIBUTES:
      return {
        ...state,
        itemAttributes: payload,
      };
    case types.SET_ITEM_FORM:
      return {
        ...state,
        itemForm: payload,
      };
    case types.SET_ITEM_FORM_FIELD:
      return {
        ...state,
        itemForm: {
          [payload.name]: payload.value,
          ...state.itemForm,
        },
      };
    case types.CLEAR_ITEM_FORM:
      return {
        ...state,
        itemForm: state.itemForm,
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
    case types.SET_DEPARTMENT_ID:
      return {
        ...state,
        departmentId: parseInt(payload, 10),
      };
    case types.SET_CATEGORY_ID:
      return {
        ...state,
        categoryId: parseInt(payload, 10),
      };
    case types.SET_SEARCHING_ITEMS:
      return {
        ...state,
        searchingItems: payload,
      };
    case types.SET_SEARCHED_ITEMS:
      return {
        ...state,
        searchedItems: payload.rows || [],
        searchedItemsMeta: payload.meta || initialState.searchedItemsMeta,
      };
    case types.SET_ITEMS_NOT_FOUND:
      return {
        ...state,
        itemsNotFound: payload,
      };
    case types.SET_SEARCH_KEYWORDS:
      return {
        ...state,
        searchKeywords: payload,
      };
    default:
      return state;
  }
};

export default reducer;
