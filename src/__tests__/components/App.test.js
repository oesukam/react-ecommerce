import React from 'react';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps } from '../../components/App';

let wrapper;

const props = {
  _fetchCategories: jest.fn(),
  _fetchDepartments: jest.fn(),
  _fetchCurrentUser: jest.fn(),
  _fetchAllTax: jest.fn(),
  _fetchShippingRegions: jest.fn(),
  _fetchOrders: jest.fn(),
}

describe('App.jsx', () => {
  test('should render App.jx', () => {
    wrapper = shallow(
      <App {...props} />
    );
    expect(wrapper).toMatchSnapshot();
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
  });
});
