import React from 'react';
import { shallow } from 'enzyme';
import {
  OrderModal,
  mapStateToProps,
  mapDispatchToProps,
  card,
} from '../../../components/OrderModal/OrderModal';
import initialState from '../../../store/initialState';
import tickAsync from '../../../utils/tickAsync';

let wrapper;
const props = {
  orders: [],
  cartId: 1,
  orderStep: 'Delivery',
  orderSteps: ['Delivery', 'Confirmation', 'Payment', 'Finish'],
  submittingOrder: false,
  user: {},
  updatingUser: false,
  updatingUserAddress: false,
  regions: [],
  region: {},
  cartProducts: [],
  allTax: [],
  stripeToken: {},
  cartTotalAmount: 10,
  _setOrderModal: jest.fn(),
  _handleUserInput: jest.fn(),
  _fetchOrders: jest.fn(),
  _setOrderStep: jest.fn(),
  _setSubmittingOrder: jest.fn(),
  _submitOrder: jest.fn(),
  _submitOrderPayment: jest.fn(),
  _generateCartId: jest.fn(),
  _submitEmptyCart: jest.fn(),
  _generateStripToken: jest.fn(),
}

describe('OrderModal.jsx', () => {
  test('should render OrderModal.jx', () => {
    wrapper = shallow(
      <OrderModal {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render without cartId', () => {
    const newProps = {...props};
    newProps.cartId = ''
    wrapper = shallow(
      <OrderModal {...newProps} />
    );
    expect(wrapper.instance().props.cartId).toBe('');
  });

  test('should render default step', () => {
    const orderStep = '';
    const newProps = {...props};
    newProps.orderStep = orderStep
    wrapper = shallow(
      <OrderModal {...newProps} />
    );
    expect(wrapper.instance().props.orderStep).toBe(orderStep);
  });

  test('should render Delivery', () => {
    const orderStep = 'Delivery';
    const newProps = {
      ...props,
      user: {
        country: 'country',
        address_1: 'address_1',
        city: 'city',
        region: 'region',
      }
    };
    newProps.orderStep = orderStep
    wrapper = shallow(
      <OrderModal {...newProps} />
    );
    expect(wrapper.instance().props.orderStep).toBe(orderStep);
  });

  test('should render Confirmation', () => {
    const orderStep = 'Confirmation';
    const newProps = {...props};
    newProps.orderStep = orderStep
    wrapper = shallow(
      <OrderModal {...newProps} />
    );
    expect(wrapper.instance().props.orderStep).toBe(orderStep);
  });

  test('should render Payment', () => {
    const orderStep = 'Payment';
    const newProps = {...props};
    newProps.orderStep = orderStep
    wrapper = shallow(
      <OrderModal {...newProps} />
    );
    expect(wrapper.instance().props.orderStep).toBe(orderStep);
  });

  test('should render Finish', () => {
    const orderStep = 'Finish';
    const newProps = {...props};
    newProps.orderStep = orderStep
    wrapper = shallow(
      <OrderModal {...newProps} />
    );
    expect(wrapper.instance().props.orderStep).toBe(orderStep);
  });

  describe('when clicking on `Back` button', () => {
    test('should render Delivery as default', () => {
      const orderStep = '';
      const defaultStep = 'Delivery'
      const newProps = {...props};
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.previous-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(defaultStep)
    });

    test('should render Delivery', () => {
      const orderStep = 'Confirmation';
      const previousStep = 'Delivery'
      const newProps = {...props};
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.previous-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(previousStep)
    });

    test('should render Confirmation', () => {
      const orderStep = 'Payment';
      const previousStep = 'Confirmation'
      const newProps = {...props};
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.previous-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(previousStep)
    });

    test('should render Payment', () => {
      const orderStep = 'Finish';
      const previousStep = 'Payment'
      const newProps = {...props};
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.previous-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(previousStep)
    });
  });

  describe('when clicking on `Next` button', () => {
    const userAddressProp = {
      address_1: 'address_1',
      city: 'city',
      region: 'region',
      shipping_region_id: 1
    }
    test('should render Delivery as default', () => {
      const orderStep = '';
      const defaultStep = 'Delivery'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep
      // newProps.submittingOrder = true
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.next-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(defaultStep)
    });

    test('should render Confirmation', () => {
      const orderStep = 'Delivery';
      const nextStep = 'Confirmation'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.next-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(nextStep)
    });

    test('should render Payment', () => {
      const orderStep = 'Confirmation';
      const nextStep = 'Payment'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.next-btn').simulate('click');
      expect(newProps._setOrderStep).toHaveBeenCalledWith(nextStep)
    });

    test('should not render Finish with invalid credit card', () => {
      const orderStep = 'Payment';
      const nextStep = 'Finish'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.next-btn').simulate('click');
      expect(newProps._setOrderStep).not.toHaveBeenCalledWith(nextStep)
    });

    test('should not render Finish without order id', () => {
      const orderStep = 'Payment';
      const nextStep = 'Finish'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.setState({
        validCreditCard: true
      })
      wrapper.find('.next-btn').simulate('click');
      expect(newProps._setOrderStep).not.toHaveBeenCalledWith(nextStep)
    });

    test('should not render Finish with invalid stripe token', () => {
      const orderStep = 'Payment';
      const nextStep = 'Finish'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep
      newProps._submitOrder = jest.fn().mockImplementation(() => Promise.resolve({ orderId: 1 }))
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.setState({
        validCreditCard: true
      })
      wrapper.update();
      wrapper.find('.next-btn').simulate('click');
      expect(newProps._submitOrder).toHaveBeenCalled();
      expect(newProps._setOrderStep).not.toHaveBeenCalledWith(nextStep);
    });

    test('should not render Finish with stripe payment response', async () => {
      const orderStep = 'Payment';
      const nextStep = 'Finish'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep;
      newProps._submitOrder = jest.fn().mockImplementation(() => Promise.resolve({ orderId: 1 }));
      newProps._generateStripToken = jest.fn().mockImplementation(() => Promise.resolve({ token: 'token' }));
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.setState({
        validCreditCard: true
      })
      wrapper.find('.next-btn').simulate('click');
      await tickAsync();
      expect(newProps._submitOrder).toHaveBeenCalled();
      expect(newProps._generateStripToken).toHaveBeenCalled();
      expect(newProps._setOrderStep).not.toHaveBeenCalledWith(nextStep);
    });

    test('should render Finish', async () => {
      const orderStep = 'Payment';
      const nextStep = 'Finish'
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.cartId = 1;
      newProps.orderStep = orderStep;
      newProps.submittingOrder = true;
      newProps._submitOrder = jest.fn().mockImplementation(() => Promise.resolve({ orderId: 1 }));
      newProps._generateStripToken = jest.fn().mockImplementation(() => Promise.resolve({ token: 'token' }));
      newProps._submitOrderPayment = jest.fn().mockImplementation(() => Promise.resolve({ paid: true }));
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.setState({
        validCreditCard: true
      })
      
      wrapper.find('.next-btn').simulate('click');

      await tickAsync();
      
      expect(newProps._submitOrder).toHaveBeenCalled();
      expect(newProps._generateStripToken).toHaveBeenCalled();
      expect(newProps._submitOrderPayment).toHaveBeenCalled();
      expect(newProps._submitEmptyCart).toHaveBeenCalledWith(newProps.cartId);
      expect(newProps._setOrderStep).toHaveBeenCalledWith(nextStep);
    });

    test('should close the order modal', () => {
      const orderStep = 'Finish';
      const newProps = {
        ...props,
        user: {
          ...props.user,
          ...userAddressProp
        }
      };
      newProps.orderStep = orderStep;
      wrapper = shallow(
        <OrderModal {...newProps} />
      );
      wrapper.find('.next-btn').simulate('click');

      expect(newProps._setOrderModal).toHaveBeenCalledWith('');
    });
  });
  
  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('cartId')
    })
  });

  describe('actions creators', () => {
    test('should call _setOrderModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setOrderModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _handleUserInput action', () => {
      const event = { target: { name: 'name', value: 'value' }};
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(event));
      mapDispatchToProps(dispatch)._handleUserInput(event);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchOrders action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._fetchOrders();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setOrderStep action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setOrderStep();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setSubmittingOrder action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setSubmittingOrder();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitOrder action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitOrder();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitOrderPayment action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitOrderPayment();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _generateCartId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._generateCartId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitEmptyCart action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitEmptyCart();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _generateStripToken action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._generateStripToken();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
