import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import {
  shallow, mount
} from 'enzyme';
import ItemCard from '../../components/ItemCard/ItemCard';

let wrapper;
const props = {
  item: {
    product_id: 1,
    adding: true,
    thumbnail: 'thumbnail 1',
    price: 10,
  },
  addToCart: jest.fn()
}
describe('ItemCard.jsx', () => {
  test('should render ItemCard.jx', () => {
    wrapper = shallow(<ItemCard {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render ItemCard.jx with loading spinner', () => {
    const newProps = {...props};
    newProps.item.adding = true;    
    wrapper = mount(<Router><ItemCard {...newProps}/></Router>);
    expect(wrapper.find('ItemCard').props().item.adding).toBeTruthy();
  });

  test('should render ItemCard.jx with discounted price', () => {
    const newProps = {...props};
    newProps.item.price = 10;    
    newProps.item.discounted_price = 8;    
    wrapper = mount(<Router><ItemCard {...newProps}/></Router>);
    expect(wrapper.find('ItemCard').props().item.discounted_price)
      .toBeLessThan(newProps.item.price);
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