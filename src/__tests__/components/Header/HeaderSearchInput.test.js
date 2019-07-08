import React from 'react';
import { shallow } from 'enzyme';
import { HeaderSearchInput, mapDispatchToProps } from '../../../components/Header/HeaderSearchInput';
import tickAsync from '../../../utils/tickAsync';

let wrapper;
const props = {
  history: {
    push: jest.fn()
  },
  onChange: jest.fn(),
  searchingItems: false,
  searchKeywords: '',
  searchedItems: [
    {
      product_id: 1,
      name: 'name'
    }
  ],
  _searchProducts: jest.fn(),
  _setSearchedItems: jest.fn(),
  _setSearchKeywords: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _searchProductsRecommendation: jest.fn().mockImplementation(() => Promise.resolve([]))
};

jest.useFakeTimers();

describe('<HeaderSearchInput />', () => {
  beforeEach(() => {
    wrapper = shallow(<HeaderSearchInput {...props} />);
  });

  test('Should render the <HeaderSearchInput />', () => {
    wrapper = shallow(<HeaderSearchInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when input changes', () => {
    test('should call `_setSearchKeywords` and set state `value` on `enter key` press with value', () => {
      const preventDefault = jest.fn();
      const newProps = {
        ...props,
        searchKeywords: 'keywords',
      };
      wrapper = shallow(<HeaderSearchInput {...newProps}/>);
      wrapper.setState({
        dropdown: true,
        items: [
          {
            product_id: 1,
            name: 'name'
          }
        ]
      });
      wrapper.update();
      const value = 'value';
      wrapper.find('input').simulate('keyDown', {
        keyCode: 13,
        preventDefault,
        target: { value }
      });
      expect(newProps._setSearchKeywords).toHaveBeenCalled();
    });

    test('should call `_setSearchKeywords` and set state `value` on `enter key` press', () => {
      const preventDefault = jest.fn();
      wrapper = shallow(<HeaderSearchInput {...props}/>);
      const value = 'value';
      wrapper.find('input').simulate('keyDown', { keyCode: 13, preventDefault, target: { value } });
      expect(props._setSearchKeywords).toHaveBeenCalled();
    });

    test('should set call `_setSearchedItems` on empty `value` on `enter key` press', () => {
      const preventDefault = jest.fn();
      const value = '';
      const event = { keyCode: 13, preventDefault, target: { value } }
      wrapper = shallow(<HeaderSearchInput {...props}/>);
      wrapper.find('input').simulate('keyDown', event);
      expect(props._setSearchedItems).toHaveBeenCalled();
    });

    test('should set call `_setSearchKeywords` on input change', () => {
      const newProps = {...props};
      const preventDefault = jest.fn();
      const event = { keyCode: 13, preventDefault, target: { value: '' } }
      wrapper = shallow(<HeaderSearchInput {...newProps}/>);
      wrapper.find('input').simulate('change', event);
      jest.runAllTimers();
      expect(newProps._setSearchKeywords).toHaveBeenCalled();
    });

    test('should set call `_setSearchKeywords` on input change with text', () => {
      const newProps = {...props};
      newProps.searchKeywords = 'text';
      const preventDefault = jest.fn();
      const event = { keyCode: 13, preventDefault, target: { value: '' } }
      wrapper = shallow(<HeaderSearchInput {...newProps}/>);
      wrapper.find('input').simulate('change', event);
      jest.runAllTimers();
      expect(newProps._setSearchKeywords).toHaveBeenCalled();
    });
  });

  describe('when clicking on clear search input', () => {
    test('should call `clearInput`',  () => {
      const preventDefault = jest.fn();
      const newProps = {...props};
      const event = { keyCode: 10, preventDefault, target: { value: 'value' } }
      wrapper = shallow(<HeaderSearchInput {...newProps} />);
      wrapper.find('input').simulate('keyDown', event);
      wrapper.find('button[data-test="clear-search-input"]').simulate('click')
      expect(newProps._setSearchKeywords).toHaveBeenCalled();
    });
  });

  describe('when clicking recommended item', () => {
    test('should set dropdown to `false`',  () => {
      const newProps = {
        ...props,
        searchKeywords: 'search',
      };
      wrapper = shallow(<HeaderSearchInput {...newProps} />);
      wrapper.setState({
        dropdown: true,
        items: [
          {
            product_id: 1,
            name: 'name'
          }
        ]
      })
      wrapper.update();
      wrapper.find('.search-items__item').simulate('click')
      expect(wrapper.state.dropdown).toBeFalsy();
    });
  });

  describe('actions creators', () => {
    test('should dispatch `_searchProducts`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._searchProducts({ searchKeywords: '', page: 1});
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_setSearchedItems`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSearchedItems();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_setSearchedItems`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSearchKeywords();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_searchProductsRecommendation`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._searchProductsRecommendation();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});