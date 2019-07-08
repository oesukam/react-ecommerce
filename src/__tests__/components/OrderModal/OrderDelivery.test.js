import React from 'react';
import { shallow } from 'enzyme';
import {
  OrderDelivery,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/OrderModal/OrderDelivery';
import initialState from '../../../store/initialState';
let wrapper;
const props = {
  cartId: 1,
  userError: {
    field: '',
    message: 'message'
  },
  user: {},
  regions: [
    {
      shipping_region: 'Please Select',
      shipping_region_id: 1
    },
    {
      shipping_region: 'region',
      shipping_region_id: 2
    }
  ],
  region: {},
  _handleUserInput: jest.fn(),
}

describe('OrderDelivery.jsx', () => {
  test('should render OrderDelivery.jx', () => {
    wrapper = shallow(
      <OrderDelivery {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('user errors', () => {
    test('should render with name error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'name'
      newProps.user.name = 'name'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('name');
    });

    test('should render with country error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'country'
      newProps.user.country = 'country'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('country');
    });

    test('should render with city error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'city'
      newProps.user.city = 'city'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('city');
    });

    test('should render with state error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'state'
      newProps.user.state = 'state'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('state');
    });

    test('should render with region error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'region'
      newProps.user.region = 'region'
      wrapper = shallow(
        <OrderDelivery { ...newProps } />
      );
      expect(wrapper.instance().props.userError.field).toBe('region');
    });

    test('should render with postal code error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'postal_code'
      newProps.user.postal_code = '20000'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('postal_code');
    });

    test('should render with address_1 error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'address_1'
      newProps.user.address_1 = 'address_1'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('address_1');
    });

    test('should render with address_2 error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'address_2'
      newProps.user.address_2 = 'address_2'
      wrapper = shallow(
        <OrderDelivery {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('address_2');
    });
  });

  describe('when selecting a region', () => {
    test('should call _handleUserInput', () => {
      wrapper = shallow(<OrderDelivery {...props}/>)
      wrapper.find('#region-select').simulate('change', { target: { value: 2 } });
      expect(props._handleUserInput).toHaveBeenCalled();
    })
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('region')
    })
  });

  describe('actions creators', () => {
    test('should call _handleUserInput action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      const event = { target: { name: 'name', value: 'value' }}
      mapDispatchToProps(dispatch)._handleUserInput(event);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
