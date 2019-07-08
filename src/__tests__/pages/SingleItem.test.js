import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';
import { BrowserRouter as Router } from 'react-router-dom'
import { SingleItem, mapDispatchToProps, mapStateToProps } from '../../pages/SingleItem/SingleItem';
import initialState from '../../store/initialState';
import tickAsync from '../../utils/tickAsync';

let wrapper;
let store;
const mockStore = configureStore([thunk]);

const itemAttributes = {
  Color: [
    {
      attribute_value_id: 1,
      attribute_value: 'Blue'
    }
  ],
  Size: [
    {
      attribute_value_id: 2,
      attribute_value: 'M'
    }
  ]
};
const props = {
  history: {
    goBack: jest.fn()
  },
  match: {
    params: { productId: 1 },
  },
  item: {
    image: 'image 1',
    image_2: 'image 2',
    product_id: 1,
    attributes: ''
  },
  loadingItem: false,
  cartProductForm: {
    cart_id: 222,
    quantity: 1
  },
  submittingCartProduct: false,
  itemAttributes,
  cartProducts: [
    { product_id: 1, attributes: '' }
  ],
  _getItem: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _getCartId: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
  _setCartField: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _addToCart: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _getItemAttributes: jest.fn().mockImplementation(() => Promise.resolve(true)),
}

describe('SingleItem.jsx', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('should render SingleItem.jx', () => {
    wrapper = shallow(
      <SingleItem {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render SingleItem.jx with discounted price', () => {
    const discountedPrice = 5;
    const newProps = {...props};
    newProps.item.price = 6;
    newProps.item.discounted_price = discountedPrice;
    wrapper = shallow(
      <SingleItem {...newProps} />
    );
    expect(wrapper.instance().props.item.discounted_price).toBe(discountedPrice);
  });

  test('should render SingleItem.jx with empty attributes', () => {
    const newProps = {
      ...props,
      itemAttributes: {
        Size: [],
        Color: [],
      }
    };
    wrapper = shallow(
      <SingleItem {...newProps} />
    );
    expect(wrapper.instance().props.itemAttributes).toEqual({
      Size: [],
      Color: [],
    });
  });

  describe('when clicking on `+` button', () => {
    test('should call _setCartModal', () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <SingleItem {...props} />
          </Router>
        </Provider>
      );
      wrapper.find('button[data-test="quantity-sub-btn"]').simulate('click');
      expect(props._setCartField).toHaveBeenCalled();
    });
  });

  describe('when clicking the thumbnail', () => {
    test('should set selectedImage equal to `image 1`', () => {
      const newProps = {...props};
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.images__views__img').at(0).simulate('click');
      expect(wrapper.instance().state.selectedImage).toBe('image 1');
    });

    test('should set selectedImage equal to `image 2`', () => {
      const newProps = {...props};
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.images__views__img').at(1).simulate('click');
      expect(wrapper.instance().state.selectedImage).toBe('image 2');
    });
  });

  describe('when selecting a color', () => {
    test('should call _setCartField', () => {
      const newProps = {...props};
      newProps.cartProductForm.color = 'Blue';
      newProps.itemAttributes = itemAttributes;
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.color-box').at(0).simulate('click');
      expect(newProps._setCartField).toHaveBeenCalled();
    });
  });

  describe('when selecting the size color', () => {
    test('should call _setCartField', () => {
      const newProps = {...props};
      newProps.cartProductForm.size = 'M';
      newProps.itemAttributes = itemAttributes;
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.size-block').at(0).simulate('click');
      expect(newProps._setCartField).toHaveBeenCalled();
    });
  });

  describe('when clicking add to cart', () => {
    test('should not call _addToCart without size selected', async () => {
      const newProps = {...props};
      newProps.cartProductForm.size = ''
      newProps.cartProductForm.color = 'White'
      newProps.submittingCartProduct = true;
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');

      await tickAsync();

      expect(newProps._addToCart).not.toHaveBeenCalled();
    });

    test('should not call _addToCart without color selected', async () => {
      const newProps = {...props};
      newProps.cartProductForm.size = 'M'
      newProps.cartProductForm.color = ''
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');

      await tickAsync();

      expect(newProps._addToCart).not.toHaveBeenCalled();
    });

    test('should call _getCartId by generating cart_id without the response', async () => {
      const newProps = {...props};
      newProps.cartProductForm.cart_id = '';
      newProps.cartProductForm.size = 'M'
      newProps.cartProductForm.color = 'White'
      newProps._getCartId = jest.fn().mockImplementation(() => Promise.resolve({}))
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');

      await tickAsync();

      expect(newProps._getCartId).toHaveBeenCalled();
      expect(newProps._addToCart).not.toHaveBeenCalled();
    });

    test('should call _getCartId', async () => {
      const newProps = {
        ...props,
        cartProductForm: {
          cart_id: '',
          size: 'M',
          color: 'White',
          quantity: 1,
        },
        _getCartId: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 }))
      }
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');

      await tickAsync();

      expect(newProps._getCartId).toHaveBeenCalled();
      expect(newProps._addToCart).toHaveBeenCalled();
    });

    test('should call _addToCart without response', async () => {
      const newProps = {
        ...props,
        cartProductForm: {
          cart_id: '',
          size: 'M',
          color: 'White',
          quantity: 1,
        },
        _getCartId: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
        _addToCart: jest.fn().mockImplementation(() => Promise.resolve(false))
      }
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');

      await tickAsync();

      expect(newProps._addToCart).toHaveBeenCalled();
    });

    test('should call _addToCart by generating cart_id', async () => {
      const newProps = {
        ...props,
        cartProductForm: {
          cart_id: '',
          size: 'M',
          color: 'White',
          quantity: 1,
        },
        _getCartId: jest.fn().mockImplementation(() => Promise.resolve({ cart_id: 1 })),
        _addToCart: jest.fn().mockImplementation(() => Promise.resolve(true))
      }
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');

      await tickAsync();

      expect(newProps._addToCart).toHaveBeenCalled();
    });

    test('should call _addToCart without response', () => {
      const newProps = {
        ...props,
        cartProductForm: {
          cart_id: 1,
          size: 'M',
          color: 'White',
          quantity: 1,
        },
        _addToCart: jest.fn().mockImplementation(() => Promise.resolve(false))
      }
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');
      expect(newProps._addToCart).toHaveBeenCalled();
    });

    test('should call _addToCart', () => {
      const newProps = {
        ...props,
        cartProductForm: {
          cart_id: 1,
          size: 'M',
          color: 'White',
          quantity: 1,
        },
        _addToCart: jest.fn().mockImplementation(() => Promise.resolve(true))
      }
      wrapper = shallow(<SingleItem {...newProps} />);
      wrapper.find('.product__add-btn').simulate('click');
      expect(newProps._addToCart).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('submittingCartProduct')
    })
  });

  describe('actions creators', () => {
    test('should call _getItem action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._getItem();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _getCartId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._getCartId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setCartField action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setCartField();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _addToCart action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._addToCart();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _getItemAttributes action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._getItemAttributes();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
