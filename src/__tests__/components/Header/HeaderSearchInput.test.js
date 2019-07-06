import React from 'react';
import { shallow } from 'enzyme';
import { HeaderSearchInput, mapDispatchToProps } from '../../../components/Header/HeaderSearchInput';

let wrapper;
const props = {
  onChange: jest.fn(),
  searchingItems: false,
  searchedItems: [
    {
      product_id: 1,
      name: 'name'
    }
  ],
  _searchProducts: jest.fn(),
  _setSearchedItems: jest.fn(),
};
describe('<HeaderSearchInput />', () => {
  beforeEach(() => {
    wrapper = shallow(<HeaderSearchInput {...props} />);
  });
  test('Should render the <HeaderSearchInput />', () => {
    wrapper = shallow(<HeaderSearchInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when input changes', () => {
    test('should set state `value`', () => {
      const value = 'value';
      wrapper.find('input').simulate('change', { target: { value } });
      expect(wrapper.state().value).toBe(value);
    });

    test('should call `_searchProducts` and set state `value` on `enter key` press', () => {
      const preventDefault = jest.fn();
      wrapper = shallow(<HeaderSearchInput {...props}/>);
      const value = 'value';
      wrapper.find('input').simulate('keyDown', { keyCode: 13, preventDefault, target: { value } });
      expect(wrapper.state().value).toBe(value);
      expect(props._searchProducts).toHaveBeenCalled();
    });

    test('should set call `_setSearchedItems` on empty `value` on `enter key` press', () => {
      const preventDefault = jest.fn();
      const value = '';
      const event = { keyCode: 13, preventDefault, target: { value } }
      wrapper = shallow(<HeaderSearchInput {...props}/>);
      wrapper.find('input').simulate('keyDown', event);
      expect(wrapper.state().value).toBe(value);
      expect(props._setSearchedItems).toHaveBeenCalled();
    });

    test('should  not set state `value` on `other key` press', () => {
      const value = 'value';
      wrapper.find('input').simulate('keyDown', { keyCode: 10, target: { value } });
      expect(wrapper.state().value).toBe('');
    });
  });

  describe('when clicking on clear search input', () => {
    test('should call `clearInput`',  () => {
      const preventDefault = jest.fn();
      const event = { keyCode: 10, preventDefault, target: { value: 'value' } }
      wrapper = shallow(<HeaderSearchInput {...props} />);
      wrapper.find('input').simulate('keyDown', event);
      wrapper.find('button[data-test="clear-search-input"]').simulate('click')
      expect(wrapper.state().value).toBe('');
    })
  });

  describe('actions creators', () => {
    test('should dispatch `_searchProducts`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._searchProducts();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_setSearchedItems`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSearchedItems();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});