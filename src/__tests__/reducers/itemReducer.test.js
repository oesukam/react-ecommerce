import * as types from '../../actions-types/itemActionsTypes';
import reducer from '../../reducers/itemReducer';
import { item as initialState } from '../../store/initialState';

describe('itemReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.SET_LOADING_ITEM}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_ITEM,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingItem: payload,
    });
  });

  test(`should handle ${types.SET_LOADING_ITEMS}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_ITEMS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingItems: payload,
    });
  });

  test(`should handle ${types.SET_ITEMS}`, () => {
    const payload = {
      rows: [],
      meta: {
        page: 1,
        pages: 1,
      },
    };
    const action = {
      type: types.SET_ITEMS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      items: payload.rows,
      meta: payload.meta,
    });
  });

  test(`should handle ${types.SET_ITEMS} without meta data`, () => {
    const payload = {
      rows: [],
    };
    const action = {
      type: types.SET_ITEMS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      items: payload.rows,
      meta: initialState.meta,
    });
  });

  test(`should handle ${types.ADDING_ITEM_TO_CART}`, () => {
    const payload = {
      itemId: 1,
      adding: true,
    };
    const action = {
      type: types.ADDING_ITEM_TO_CART,
      payload,
    };
    const items = [{ product_id: 1, adding: true }];
    expect(reducer({ items }, action)).toEqual({
      items,
    });
  });

  test(`should handle ${
    types.ADDING_ITEM_TO_CART
  } with different 'product_id`, () => {
    const payload = {
      itemId: 1,
      adding: true,
    };
    const action = {
      type: types.ADDING_ITEM_TO_CART,
      payload,
    };
    const items = [{ product_id: 2, adding: true }];
    expect(reducer({ items }, action)).toEqual({
      items,
    });
  });

  test(`should handle ${types.SET_ITEM}`, () => {
    const payload = {};
    const action = {
      type: types.SET_ITEM,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      item: payload,
    });
  });

  test(`should handle ${types.SET_ITEM_ATTRIBUTES}`, () => {
    const payload = '';
    const action = {
      type: types.SET_ITEM_ATTRIBUTES,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      itemAttributes: payload,
    });
  });

  test(`should handle ${types.SET_ITEM_FORM}`, () => {
    const payload = {};
    const action = {
      type: types.SET_ITEM_FORM,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      itemForm: payload,
    });
  });

  test(`should handle ${types.SET_ITEM_FORM_FIELD}`, () => {
    const payload = {
      name: 'name',
      value: 'value',
    };
    const action = {
      type: types.SET_ITEM_FORM_FIELD,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      itemForm: { [payload.name]: payload.value },
    });
  });

  test(`should handle ${types.CLEAR_ITEM_FORM}`, () => {
    const action = {
      type: types.CLEAR_ITEM_FORM,
    };
    expect(reducer({ itemForm: {} }, action)).toEqual({
      itemForm: {},
    });
  });

  test(`should handle ${types.SET_ITEM_ERROR}`, () => {
    const payload = {
      field: 'name',
      message: 'message',
    };
    const action = {
      type: types.SET_ITEM_ERROR,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      error: payload,
    });
  });

  test(`should handle ${types.SET_ITEM_ERROR}`, () => {
    const payload = {
      field: 'name',
      message: 'message',
    };
    const action = {
      type: types.SET_ITEM_ERROR,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      error: payload,
    });
  });

  test(`should handle ${types.SET_DEPARTMENTS}`, () => {
    const payload = [];
    const action = {
      type: types.SET_DEPARTMENTS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      departments: payload,
    });
  });

  test(`should handle ${types.SET_CATEGORIES}`, () => {
    const payload = [];
    const action = {
      type: types.SET_CATEGORIES,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      categories: payload,
    });
  });

  test(`should handle ${types.SET_DEPARTMENT_ID}`, () => {
    const payload = 10;
    const action = {
      type: types.SET_DEPARTMENT_ID,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      departmentId: payload,
    });
  });

  test(`should handle ${types.SET_CATEGORY_ID}`, () => {
    const payload = 10;
    const action = {
      type: types.SET_CATEGORY_ID,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      categoryId: payload,
    });
  });

  test(`should handle ${types.SET_SEARCHING_ITEMS}`, () => {
    const payload = true;
    const action = {
      type: types.SET_SEARCHING_ITEMS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      searchingItems: payload,
    });
  });

  test(`should handle ${types.SET_SEARCHED_ITEMS}`, () => {
    const payload = [];
    const action = {
      type: types.SET_SEARCHED_ITEMS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      searchedItems: payload,
    });
  });
});
