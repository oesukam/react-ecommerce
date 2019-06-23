import React from 'react';
import {
  shallow,
} from 'enzyme';
import ItemCard from '../../components/ItemCard/ItemCard';

let wrapper;
const props = {
  item: {
    product_id: 1,
    adding: true,
  },
  addToCart: jest.fn()
}
describe('ItemCard.jsx', () => {
  test('should render ItemCard.jx', () => {
    wrapper = shallow( <
      ItemCard / >
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render ItemCard.jx with loading spinner', () => {
    wrapper = shallow(<ItemCard {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on `Buy now` button', () => {
    test('should call addToCart()', () => {
      wrapper = shallow(<ItemCard {...props} />);
      wrapper.find('button[data-test="buy-btn"]').simulate('click');
      expect(props.addToCart).toHaveBeenCalled();
    });

    test('should call addToCart() as default prop', () => {
      const newProps = {
        item: props.item
      }
      wrapper = shallow( < ItemCard {...newProps}/>);
      wrapper.find('button[data-test="buy-btn"]').simulate('click');
      expect(props.addToCart).toHaveBeenCalled();
    });
  });
});