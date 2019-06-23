import React from 'react';
import {
  shallow,
} from 'enzyme';
import Quantity from '../../components/Quantity/Quantity';

let wrapper;
const props = {
  quanity: 1,
  onQuantityChange: jest.fn()
}

describe('Quantity.jsx', () => {
  test('should render Quantity.jx', () => {
    wrapper = shallow(<Quantity />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on `Buy now` button', () => {
    test('should call addToCart()', () => {
      wrapper = shallow(<Quantity {...props} />);
      wrapper.find('button[data-test="quantity-sub-btn"]').simulate('click');
      expect(props.onQuantityChange).toHaveBeenCalled();
    })
    test('should call addToCart() as default prop', () => {
      wrapper = shallow(<Quantity {...props}/>);
      wrapper.find('button[data-test="quantity-add-btn"]').simulate('click');
      expect(props.onQuantityChange).toHaveBeenCalled();
    });
  });
});