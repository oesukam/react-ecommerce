import React from 'react';
import {
  shallow, mount
} from 'enzyme';
import Quantity from '../../components/Quantity/Quantity';

let wrapper;
const props = {
  quantity: 1,
  onQuantityChange: jest.fn()
}

describe('Quantity.jsx', () => {
  test('should render Quantity.jx', () => {
    wrapper = shallow(<Quantity {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Quantity.jx with 0', () => {
    const newProps = { ...props };
    newProps.quantity = 0;
    wrapper = mount(<Quantity { ...newProps } />);
    expect(wrapper.props().quantity).toBe(0);
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