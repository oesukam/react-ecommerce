import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Items, mapStateToProps, mapDispatchToProps } from '../../pages/Items/Items';
import initialState from '../../store/initialState';
import tickAsync from '../../utils/tickAsync';

let wrapper;
let store;
const mockStore = configureMockStore([thunk]);
const searchedItems = [
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
];
const props = {
  loadingItems: false,
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
  searchedItems,
  searchedItemsMeta: { page: 1, pages: 1 },
  searchingItems: false,
  searchKeywords: '',
  _generateCartId: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
  _addItemToCart: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
  _setSearchedItems: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
  _setOrderModal: jest.fn(),
  _setSearchKeywords: jest.fn(),
  _searchProducts: jest.fn(),
}

describe('Items.jsx', () => {
  test('should render Items.jx', () => {
    wrapper = shallow(
      <Items {...props}/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Items.jsx with loading content', () => {
    const newProps = {
      ...props,
      searchingItems: true,
    }
    wrapper = shallow(
      <Items {...newProps}/>
    );
    wrapper.setState({
      items: searchedItems
    });
    expect(wrapper.instance().props.searchingItems).toBeTruthy();
  })


  describe('when clicking on next page', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    })
    
    test('should call goToPage with category and department filter', () => {
      const newProps = {
        ...props,
        searchedItemsMeta: {
          page: 1,
          pages: 5,
          total: 55
        }
      }

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Items {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.pagination-nav.next-btn').simulate('click');

      expect(newProps.history.push).toHaveBeenCalled()
      expect(newProps._searchProducts).toHaveBeenCalledWith({
        page: 2,
        searchKeywords: undefined
      });
    });

    test('should call goToPage', () => {
      const newProps = {
        ...props,
        searchedItemsMeta: {
          page: 1,
          pages: 5,
          total: 55
        }
      }

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Items {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.pagination-nav.next-btn').simulate('click');

      expect(newProps.history.push).toHaveBeenCalled()
      expect(newProps._searchProducts).toHaveBeenCalled();
    });
  });

  describe('when clicking on add to cart', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    })
    
    test('should call _generateCartId when cartId not provided', async () => {
      const newProps = {...props};
      newProps.searchedItemsMeta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps._generateCartId = jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1}))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Items {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.item-card__bottom__buy-btn').at(0).simulate('click');

      await tickAsync()

      expect(newProps._generateCartId).toHaveBeenCalled()
    });

    test('should call _addItemToCart when cartId not provided and does not return a cart_id', async () => {
      const newProps = {...props};
      newProps.searchedItemsMeta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = ''
      newProps._addItemToCart = jest.fn().mockImplementation(() => Promise.resolve(false))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Items {...newProps} />
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
      newProps.searchedItemsMeta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = 1
      newProps._addItemToCart = jest.fn().mockImplementation(() => Promise.resolve(true))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Items {...newProps} />
          </Router>
        </Provider>
      );

      wrapper.find('.item-card__bottom__buy-btn').at(0).simulate('click');

      await tickAsync()

      expect(newProps._addItemToCart).toHaveBeenCalled()
    });

    test('should call _addItemToCart with provided cartId without a response', async () => {
      const newProps = {...props};
      newProps.searchedItemsMeta = {
        page: 1,
        pages: 5,
        total: 55
      }
      newProps.cartId = 1
      newProps._addItemToCart = jest.fn().mockImplementation(() => Promise.resolve(false))

      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Items {...newProps} />
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

    test('should call _searchProducts action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._searchProducts({ searchKeywords: '', page: 1 });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setSearchedItems action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSearchedItems();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setSearchKeywords action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSearchKeywords();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
