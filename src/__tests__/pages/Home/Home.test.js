import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Home, mapStateToProps, mapDispatchToProps } from '../../../pages/Home/Home';
import initialState from '../../../store/initialState';
import tickAsync from '../../../utils/tickAsync';

let wrapper;
let store;
const mockStore = configureMockStore([thunk]);

const props = {
  loadingItems: false,
  match: {
    params: {
      departmentId: 1
    }
  },
  history: {
    goBack: jest.fn(),
    push: jest.fn()
  },
  location: {
    search: 'search'
  },
  meta: {
    page: 1,
    pages: 1,
  },
  items: [
    {
      product_id: 1,
      name: 'item 1',
      thumbnail: 'thumbnail 1',
    },
    {
      product_id: 2,
      name: 'item 2',
      thumbnail: 'thumbnail 2',
    }
  ],
  searchKeywords: '',
  searchedItems: [],
  searchedItemsMeta: { page: 1, pages: 1 },
  _fetchItems: jest.fn(),
  _setCategoryId: jest.fn(),
  _addItemToCart: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _generateCartId: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
  _setOrderModal: jest.fn(),
  _setSearchKeywords: jest.fn(),
  _setDepartmentId: jest.fn(),
}

describe('Home.jsx', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render Home.jx', () => {
    wrapper = shallow(
      <Home {...props}/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should update props with different departmentId ', () => {
    const newProps = {...props};
    newProps.location.search = `?`;
    newProps.loadingItems = true;
    wrapper = shallow(
      <Home {...newProps}/>
    );
    wrapper.setProps({
      match: {
        params: { departmentId: 2 }
      }
    })
    expect(newProps._fetchItems).toHaveBeenCalled();
  });

  test('should update props with the same departmentId ', () => {
    const newProps = {...props};
    newProps.location.search = `?`;
    newProps.loadingItems = true;
    wrapper = shallow(
      <Home {...newProps}/>
    );
    wrapper.setProps({
      match: {
        params: { departmentId: 1 }
      }
    })
    expect(newProps._fetchItems).toHaveBeenCalledTimes(1);
  });

  test('should render Home.js for category', () => {
    const newProps = {...props};
    const categoryId = 'category'
    newProps.location.search = `?category=${categoryId}`;
    newProps.departmentId = 'departmentId';
    newProps.loadingItems = true;
    wrapper = shallow(
      <Home {...newProps}/>
    );
    expect(newProps._fetchItems).toHaveBeenCalledWith({
      page: 1,
      categoryId: 'category',
      departmentId: 1,
      type: 'category'
    });
  });

  describe('when clicking on next page', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    })
    
    test('should call goToPage with category and department filter', () => {
      const newProps = {...props};
      newProps.meta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.categoryId = 1;
      newProps.departmentId = 1;

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Home {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.pagination-nav.next-btn').simulate('click');

      expect(newProps.history.push).toHaveBeenCalled()
      expect(newProps._fetchItems).toHaveBeenCalledWith({
        page: 2,
        categoryId: 1,
        type: 'department'
      });
    });

    test('should call goToPage', () => {
      const newProps = {...props};
      newProps.meta = {
        page: 1,
        pages: 5,
        total: 55
      }

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Home {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.pagination-nav.next-btn').simulate('click');

      expect(newProps.history.push).toHaveBeenCalled()
      expect(newProps._fetchItems).toHaveBeenCalled();
    });
  });

  describe('when clicking on add to cart', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    })
    
    test('should call _generateCartId when cartId not provided', async () => {
      const newProps = {...props};
      newProps.meta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = ''
      newProps._generateCartId = jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1}))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Home {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.item-card__bottom__buy-btn').at(0).simulate('click');

      await tickAsync()

      expect(newProps._generateCartId).toHaveBeenCalled()
    });

    test('should call _addItemToCart when cartId not provided and does not return a cart_id', async () => {
      const newProps = {...props};
      newProps.meta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = ''
      newProps._addItemToCart = jest.fn().mockImplementation(() => Promise.resolve(false))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Home {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.item-card__bottom__buy-btn').at(0).simulate('click');

      await tickAsync()

      expect(newProps._generateCartId).toHaveBeenCalled()
      expect(newProps._addItemToCart).toHaveBeenCalled()
    });

    test('should call _addItemToCart with provided cartId', async () => {
      const newProps = {...props};
      newProps.meta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = 1
      newProps._addItemToCart = jest.fn().mockImplementation(() => Promise.resolve(true))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Home {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.item-card__bottom__buy-btn').at(0).simulate('click');

      await tickAsync()

      expect(newProps._addItemToCart).toHaveBeenCalled()
    });

    test('should call _addItemToCart with provided cartId without a response', async () => {
      const newProps = {...props};
      newProps.meta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = 1
      newProps._addItemToCart = jest.fn().mockImplementation(() => Promise.resolve(false))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Home {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.item-card__bottom__buy-btn').at(0).simulate('click');

      await tickAsync()

      expect(newProps._addItemToCart).toHaveBeenCalled()
    });
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('cartId')
    })
  });

  describe('actions creators', () => {
    test('should call _fetchItems action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._fetchItems();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setCategoryId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setCategoryId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _addItemToCart action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._addItemToCart({ itemId: 1, cartId: 1 });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _generateCartId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._generateCartId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setOrderModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setOrderModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setSearchKeywords action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSearchKeywords();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setDepartmentId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setDepartmentId();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
