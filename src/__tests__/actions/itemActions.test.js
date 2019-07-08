import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/itemActions';
import * as types from '../../actions-types/itemActionsTypes';
import * as cartTypes from '../../actions-types/cartActionsTypes';
import groupArray from '../../utils/groupArray';

const { API_URL_TEST = 'http://localhost' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('itemActions', () => {
  describe('synchronous', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test(`should dispatch ${types.SET_ITEM}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_ITEM,
        payload,
      };
      expect(actions.setItem(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ITEMS}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_ITEMS,
        payload,
      };
      expect(actions.setItems(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_ITEM}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_ITEM,
        payload,
      };
      expect(actions.setLoadingItem(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_ITEMS}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_ITEMS,
        payload,
      };
      expect(actions.setLoadingItems(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ITEM_ERROR}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_ITEM_ERROR,
        payload,
      };
      expect(actions.setItemError(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_DEPARTMENTS}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_DEPARTMENTS,
        payload,
      };
      expect(actions.setDepartments(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CATEGORIES}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_CATEGORIES,
        payload,
      };
      expect(actions.setCategories(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SEARCHING_ITEMS}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_SEARCHING_ITEMS,
        payload,
      };
      expect(actions.setSearchingItems(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SEARCHED_ITEMS}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_SEARCHED_ITEMS,
        payload,
      };
      expect(actions.setSearchedItems(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_DEPARTMENT_ID}`, () => {
      const payload = '';
      const expectedAction = {
        type: types.SET_DEPARTMENT_ID,
        payload,
      };
      expect(actions.setDepartmentId(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CATEGORY_ID}`, () => {
      const payload = '';
      const expectedAction = {
        type: types.SET_CATEGORY_ID,
        payload,
      };
      expect(actions.setCategoryId(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ITEM_FORM}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_ITEM_FORM,
        payload,
      };
      expect(actions.setItemForm(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ITEM_FORM_FIELD}`, () => {
      const payload = { name: 'name', value: 'value' };
      const expectedAction = {
        type: types.SET_ITEM_FORM_FIELD,
        payload,
      };
      expect(actions.setItemFormField(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ITEM_ATTRIBUTES}`, () => {
      const payload = '';
      const expectedAction = {
        type: types.SET_ITEM_ATTRIBUTES,
        payload,
      };
      expect(actions.setItemAttributes(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.ADDING_ITEM_TO_CART}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.ADDING_ITEM_TO_CART,
        payload,
      };
      expect(actions.addingItemToCart(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ITEMS_NOT_FOUND}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_ITEMS_NOT_FOUND,
        payload,
      };
      expect(actions.setItemsNotFound(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SEARCH_KEYWORDS}`, () => {
      const payload = '';
      const expectedAction = {
        type: types.SET_SEARCH_KEYWORDS,
        payload,
      };
      expect(actions.setSearchKeywords(payload)).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });
    describe('fetchDepartments', () => {
      test('should dispatch fetchDepartments action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        nock(API_URL_TEST)
          .get('/departments')
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_ITEM_ERROR,
            payload,
          },
        ];
        return store.dispatch(actions.fetchDepartments()).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
  
      test('should dispatch fetchDepartments action - SUCCESS', () => {
        nock(API_URL_TEST)
          .get('/departments')
          .reply(200, []);
        const expectedActions = [
          {
            type: types.SET_DEPARTMENTS,
            payload: [],
          },
        ];
        return store.dispatch(actions.fetchDepartments()).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('fetchCategories', () => {
      test('should dispatch fetchCategories action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        nock(API_URL_TEST)
          .get('/categories')
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_ITEM_ERROR,
            payload,
          },
        ];
        return store.dispatch(actions.fetchCategories()).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
  
      test('should dispatch fetchCategories action - SUCCESS', () => {
        nock(API_URL_TEST)
          .get('/categories')
          .reply(200, { rows: [] });
        const expectedActions = [
          {
            type: types.SET_CATEGORIES,
            payload: [],
          },
        ];
        return store.dispatch(actions.fetchCategories()).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('fetchItem', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        const itemId = 1;
        nock(API_URL_TEST)
          .get(`/products/${itemId}`)
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_LOADING_ITEM,
            payload: true,
          },
          {
            type: types.SET_ITEM_ERROR,
            payload,
          },
          {
            type: types.SET_LOADING_ITEM,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchItem(itemId)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
  
      test('should dispatch action - SUCCESS', () => {
        const itemId = 1;
        const payload = { item_id: itemId }
        nock(API_URL_TEST)
          .get(`/products/${itemId}`)
          .reply(200, payload);
        const expectedActions = [
          {
            type: types.SET_LOADING_ITEM,
            payload: true,
          },
          {
            type: types.SET_ITEM,
            payload,
          },
          {
            type: types.SET_LOADING_ITEM,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchItem(itemId)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('fetchItemAttributes', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        const itemId = 1;
        nock(API_URL_TEST)
          .get(`/attributes/inProduct/${itemId}`)
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_ITEM_ERROR,
            payload,
          }
        ];
        return store.dispatch(actions.fetchItemAttributes(itemId))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
  
      test('should dispatch action - SUCCESS', () => {
        const itemId = 1;
        const payload = [
          { attribute_id: 1, attribute_name: 'Color' },
          { attribute_id: 2, attribute_name: 'Size' },
        ]
        nock(API_URL_TEST)
          .get(`/attributes/inProduct/${itemId}`)
          .reply(200, payload);
        const expectedActions = [
          {
            type: types.SET_ITEM_ATTRIBUTES,
            payload: groupArray(payload, 'attribute_name'),
          },
        ];
        return store.dispatch(actions.fetchItemAttributes(itemId))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('addItemToCart', () => {
      test('should dispatch action - Failed', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        const itemId = 1;
        const cartId = 100;
        nock(API_URL_TEST)
          .post('/shoppingcart/add')
          .reply(400, payload);
        
        const expectedActions = [
          {
            type: types.ADDING_ITEM_TO_CART,
            payload: { itemId, adding: true },
          },
          {
            type: cartTypes.SET_SUBMITTING_CART_PRODUCT,
            payload: true,
          },
          {
            type: cartTypes.SET_CART_ERROR,
            payload,
          },
          {
            type: cartTypes.SET_SUBMITTING_CART_PRODUCT,
            payload: false,
          },
          {
            type: types.ADDING_ITEM_TO_CART,
            payload: { itemId, adding: false },
          },
          {
            type: cartTypes.SET_LOADING_CART_PRODUCT,
            payload: true,
          },
        ];
        return store.dispatch(actions.addItemToCart({ itemId, cartId }))
          .catch(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test('should dispatch action - Success', () => {
        const payload = []
        const itemId = 1;
        const cartId = 100;
        nock(API_URL_TEST)
          .post('/shoppingcart/add')
          .reply(200, payload);
        
        const expectedActions = [
          {
            type: types.ADDING_ITEM_TO_CART,
            payload: { itemId, adding: true },
          },
          {
            type: cartTypes.SET_SUBMITTING_CART_PRODUCT,
            payload: true,
          },
          {
            type: cartTypes.SET_SUBMITTING_CART_PRODUCT,
            payload: false,
          },
          {
            type: types.ADDING_ITEM_TO_CART,
            payload: { itemId, adding: false },
          },
          {
            type: cartTypes.SET_LOADING_CART_PRODUCT,
            payload: true,
          },
        ];
        return store.dispatch(actions.addItemToCart({ itemId, cartId }))
          .catch(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('searchProducts', () => {
      test('should dispatch action - Failed', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        const searchKeywords = 'text'
        nock(API_URL_TEST)
          .get(`/products/search?limit=20&page=1&query_string=${searchKeywords}`)
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_SEARCHING_ITEMS,
            payload: true,
          },
          {
            type: types.SET_SEARCHED_ITEMS,
            payload: [],
          },
          {
            type: types.SET_SEARCHING_ITEMS,
            payload: false,
          },
          {
            type: types.SET_SEARCHED_ITEMS,
            payload: [],
          },
        ];
        return store.dispatch(actions.searchProducts({ searchKeywords }))
          .catch(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test('should dispatch action - Success', () => {
        const response = { rows: [] }
        const searchKeywords = 'text'
        nock(API_URL_TEST)
          .get(`/products/search?limit=20&page=1&query_string=${searchKeywords}`)
          .reply(200, response);
        const expectedActions = [
          {
            type: types.SET_SEARCHING_ITEMS,
            payload: true,
          },
          {
            type: types.SET_SEARCHED_ITEMS,
            payload: [],
          },
          {
            type: types.SET_SEARCHING_ITEMS,
            payload: false,
          },
          {
            type: types.SET_SEARCHED_ITEMS,
            payload: [],
          },
        ];
        return store.dispatch(actions.searchProducts({searchKeywords}))
          .catch(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('fetchItems', () => {
      test('should dispatch fetchItems action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        }
        nock(API_URL_TEST)
        .get('/products?limit=20&page=1')
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_LOADING_ITEMS,
            payload: true,
          },
          {
            type: types.SET_ITEM_ERROR,
            payload,
          },
          {
            type: types.SET_LOADING_ITEMS,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchItems()).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
  
      test('should dispatch fetchItems action - SUCCESS', () => {
        const payload = {
          rows: [],
          meta: {
            page: 1,
            pages: 0,
            total: 0
          }
        }

        nock(API_URL_TEST)
          .get('/products?limit=20&page=1')
          .reply(200, { rows: [] });
        const expectedActions = [
          {
            type: types.SET_LOADING_ITEMS,
            payload: true,
          },
          {
            type: types.SET_ITEMS,
            payload,
          },
          {
            type: types.SET_LOADING_ITEMS,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchItems()).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });

      test('should dispatch fetchItems action by department- SUCCESS', () => {
        const payload = {
          rows: [],
          meta: {
            page: 1,
            pages: 0,
            total: 0
          }
        }
        const departmentId = 1

        nock(API_URL_TEST)
          .get(`/products/inDepartment/${departmentId}?limit=20&page=1`)
          .reply(200, { rows: [] });
        const expectedActions = [
          {
            type: types.SET_LOADING_ITEMS,
            payload: true,
          },
          {
            type: types.SET_ITEMS,
            payload,
          },
          {
            type: types.SET_LOADING_ITEMS,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchItems({ departmentId, type: 'department' }))
          .then(res => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test('should dispatch fetchItems action by category- SUCCESS', () => {
        const payload = {
          rows: [],
          meta: {
            page: 1,
            pages: 0,
            total: 0
          }
        }
        const categoryId = 1

        nock(API_URL_TEST)
          .get(`/products/inCategory/${categoryId}?limit=20&page=1`)
          .reply(200, { rows: [] });
        const expectedActions = [
          {
            type: types.SET_LOADING_ITEMS,
            payload: true,
          },
          {
            type: types.SET_ITEMS,
            payload,
          },
          {
            type: types.SET_LOADING_ITEMS,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchItems({ categoryId, type: 'category' }))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('searchProductsRecommendation', () => {
      test('should dispatch action - Success', () => {
        const response = { rows: [] }
        const searchKeywords = 'text'
        nock(API_URL_TEST)
          .get(`/products/search?limit=5&page=1&query_string=${searchKeywords}`)
          .reply(200, response);
        const expectedActions = [];
        return store.dispatch(actions.searchProductsRecommendation(searchKeywords))
          .catch(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });
  });
});
