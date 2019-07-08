import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from '../../components/App';
import initialState from '../../store/initialState';

let wrapper;

const props = {
  isAuth: false,
  cartModal: false,
  authModal: '',
  orderModal: '',
  cartId: '',
  _fetchCategories: jest.fn(),
  _fetchDepartments: jest.fn(),
  _fetchCurrentUser: jest.fn(),
  _fetchAllTax: jest.fn(),
  _fetchShippingRegions: jest.fn(),
  _fetchOrders: jest.fn(),
  _generateCartId: jest.fn(),
}

describe('App.jsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render App.jx', () => {
    wrapper = shallow(
      <App {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render modals', () => {
    const newProps = {
      ...props,
      isAuth: true,
      cartModal: true,
      authModal: 'Sign In',
      orderModal: 'Delivery',
    };
    const wrapper = shallow(<App {...newProps} />);
  });

  test('should render App.jx for authenticated user', () => {
    const newProps = {...props};
    newProps.isAuth = true;
    wrapper = shallow(
      <App {...newProps} />
    );
    expect(newProps._fetchCurrentUser).toHaveBeenCalled();
    expect(newProps._fetchOrders).toHaveBeenCalled();
  });

  test('should render App.jx without cartId', () => {
    const newProps = {...props};
    newProps.cartId = '';
    wrapper = shallow(
      <App {...newProps} />
    );
    expect(newProps._generateCartId).toHaveBeenCalled();
  });

  test('should render App.jx with cartId', () => {
    const newProps = {...props};
    newProps.cartId = 1;
    wrapper = shallow(
      <App {...newProps} />
    );
    expect(newProps._generateCartId).not.toHaveBeenCalled();
  });

  describe('reducers', () => {
    test('should return the inital state', () => {
      expect(mapStateToProps(initialState)).toEqual({
        isAuth: false,
        authModal: '',
        cartModal: false,
        orderModal: '',
        cartId: '',
      })
    })
  });

  describe('actions creators', () => {
    test('should call _fetchCategories action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchCategories();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchDepartments action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchDepartments();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchCurrentUser action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchCurrentUser();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchAllTax action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchAllTax();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchShippingRegions action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchShippingRegions();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchOrders action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchOrders();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _generateCartId action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._generateCartId();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
