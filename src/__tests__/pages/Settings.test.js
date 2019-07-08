import React from 'react';
import { shallow } from 'enzyme';
import { Settings, mapDispatchToProps, mapStateToProps } from '../../pages/Settings/Settings';
import initialState from '../../store/initialState';

let wrapper;

const props = {
  match: {
    params: { productId: 1 },
  },
  user: {},
  loggingIn: false,
  updatingUser: false,
  updatingUserAddress: false,
  userError: { field: '', message: 'message' },
  regions: [
    {
      shipping_region_id: 1,
      shipping_region: 'Please Select'
    },
    {
      shipping_region_id: 2,
      shipping_region: 'USA'
    }
  ],
  _handleInput: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _updateUser: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _updateUserAddress: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _fetchCurrentUser: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _fetchShippingRegions: jest.fn().mockImplementation(() => Promise.resolve(true)),
}

describe('Settings.jsx', () => {
  test('should render Settings.jx', () => {
    wrapper = shallow(
      <Settings {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('user errors', () => {
    test('should render with name error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'name'
      newProps.user.name = 'name'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('name');
    });

    test('should render with email error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'email'
      newProps.user.email = 'email'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('email');
    });

    test('should render with mob_phone error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'mob_phone'
      newProps.user.mob_phone = 'mob_phone'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('mob_phone');
    });

    test('should render with day_phone error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'day_phone'
      newProps.user.day_phone = 'day_phone'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('day_phone');
    });

    test('should render with eve phone error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'eve_phone'
      newProps.user.eve_phone = 'eve_phone'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('eve_phone');
    });

    test('should render with password error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'password'
      newProps.user.password = 'password'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('password');
    });

    test('should render with country error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'country'
      newProps.user.country = 'country'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('country');
    });

    test('should render with city error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'city'
      newProps.user.city = 'city'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('city');
    });

    test('should render with region error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'region'
      newProps.user.region = 'region'
      wrapper = shallow(
        <Settings { ...newProps } />
      );
      expect(wrapper.instance().props.userError.field).toBe('region');
    });

    test('should render with postal code error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'postal_code'
      newProps.user.postal_code = '20000'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('postal_code');
    });

    test('should render with address_1 error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'address_1'
      newProps.user.address_1 = 'address_1'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('address_1');
    });

    test('should render with address_2 error', () => {
      const newProps = { ...props };
      newProps.userError.field = 'address_2'
      newProps.user.address_2 = 'address_2'
      wrapper = shallow(
        <Settings {...newProps} />
      );
      expect(wrapper.instance().props.userError.field).toBe('address_2');
    });
  });

  describe('when clicking on update profile', () => {
    test('should call _submitUser without email', () => {
      const newProps = { ...props }
      newProps.user.email = '';
      newProps.user.name = 'name';
      wrapper = shallow(<Settings {...props} />)
      const preventDefault = jest.fn();

      wrapper.find('button[data-test="update-profile"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    });

    test('should call _submitUser without name', () => {
      const newProps = { ...props }
      newProps.user.email = 'email@email.com';
      newProps.user.name = '';
      wrapper = shallow(<Settings {...props} />)
      const preventDefault = jest.fn();

      wrapper.find('button[data-test="update-profile"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    })

    test('should call _submitUser with email and name', () => {
      const preventDefault = jest.fn();
      const newProps = { ...props }
      const email = 'email@email.com';
      newProps.user.email = email;
      newProps.user.name = 'name';
      newProps.user.password = '';
      newProps.updatingUser = true;
      newProps._updateUser = jest.fn().mockImplementation(() => Promise.resolve({ email }))
      wrapper = shallow(<Settings {...newProps} />)
      wrapper.find('button[data-test="update-profile"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
      expect(newProps._updateUser).toHaveBeenCalled()
    })

    test('should call _submitUser with email, name and password', () => {
      const preventDefault = jest.fn();
      const newProps = { ...props }
      newProps.user.email = 'email@email.com';
      newProps.user.name = 'name';
      newProps.user.password = 'password';
      wrapper = shallow(<Settings {...props} />)
      wrapper.find('button[data-test="update-profile"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    })
  });

  describe('when clicking on update address', () => {
    test('should call _submitAddress without city', () => {
      const newProps = { ...props }
      newProps.user.address_1 = '';
      wrapper = shallow(<Settings {...props} />)
      const preventDefault = jest.fn();

      wrapper.find('button[data-test="update-address"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    });

    test('should call _submitAddress without region', () => {
      const newProps = { ...props }
      newProps.user.address_1 = 'address_1';
      newProps.user.city = 'city';
      wrapper = shallow(<Settings {...props} />)
      const preventDefault = jest.fn();

      wrapper.find('button[data-test="update-address"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    })

    test('should call _submitAddress without postal_code', () => {
      const newProps = { ...props }
      newProps.user.address_1 = 'address_1';
      newProps.user.city = 'city';
      newProps.user.region = 'region';
      wrapper = shallow(<Settings {...props} />)
      const preventDefault = jest.fn();

      wrapper.find('button[data-test="update-address"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    })

    test('should call _submitAddress without country', () => {
      const newProps = { ...props }
      newProps.user.address_1 = 'address_1';
      newProps.user.city = 'city';
      newProps.user.region = 'region';
      newProps.user.postal_code = '200000';
      wrapper = shallow(<Settings {...props} />)
      const preventDefault = jest.fn();

      wrapper.find('button[data-test="update-address"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    })

    test('should call _submitAddress without response', () => {
      const preventDefault = jest.fn();
      const newProps = { ...props }
      newProps.user.address_1 = 'address_1';
      newProps.user.city = 'city';
      newProps.user.region = 'region';
      newProps.user.postal_code = '200000';
      newProps.user.country = 'country';
      newProps.user.shipping_region_id = 'country';
      newProps.updatingUserAddress = true;
      newProps._updateUserAddress = jest.fn().mockImplementation(() => Promise.resolve(true))
      wrapper = shallow(<Settings {...newProps} />)
      wrapper.find('button[data-test="update-address"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
      expect(newProps._updateUserAddress).toHaveBeenCalled()
    })

    test('should call _submitAddress', () => {
      const preventDefault = jest.fn();
      const newProps = { ...props }
      const email = 'email@email.com';
      newProps.user.address_1 = 'address_1';
      newProps.user.city = 'city';
      newProps.user.region = 'region';
      newProps.user.postal_code = '200000';
      newProps.user.country = 'country';
      newProps.user.shipping_region_id = 'country';
      newProps.updatingUserAddress = true;
      newProps._updateUserAddress = jest.fn().mockImplementation(() => Promise.resolve({ email }))
      wrapper = shallow(<Settings {...newProps} />)
      wrapper.find('button[data-test="update-address"]')
        .simulate('click', { preventDefault })
      expect(preventDefault).toHaveBeenCalled()
      expect(newProps._updateUserAddress).toHaveBeenCalled()
    })
  });

  describe('when selecting a region', () => {
    test('should call _handleInput', () => {
      wrapper = shallow(<Settings {...props}/>)
      wrapper.find('#region-select').simulate('change', { target: { value: 1 } });
      expect(props._handleInput).toHaveBeenCalled();
    })
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('loggingIn')
    })
  });

  describe('actions creators', () => {
    test('should call _handleInput action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._handleInput({ target: { name: 'name', value: 'value' } });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _updateUser action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._updateUser();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _updateUserAddress action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._updateUserAddress();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchCurrentUser action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._fetchCurrentUser();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchShippingRegions action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._fetchShippingRegions();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
