import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapDispatchToProps } from '../../../components/Header/Header';

let wrapper;
const props = {
  history: { goBack: jest.fn() },
  match: {
    params: { departmentId: 1 }
  },
  isAuth: false,
  user: {},
  departments: [
    {
      department_id: 1,
      name: 'name 1'
    },
    {
      department_id: 2,
      name: 'name 2'
    }
  ],
  cartCount: 0,
  cartTotalAmount: 0,
  _setDepartment: jest.fn(),
  _setCartModal: jest.fn(),
  _setAuthModal: jest.fn(),
  _signout: jest.fn(),
};
describe('<Header />', () => {
  beforeEach(() => {
    wrapper = shallow(<Header {...props} />);
  });
  test('Should render the <Header />', () => {
    wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should trigger componentWillReceiveProps', () => {
    wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      isAuth: true
    })
    expect(wrapper.instance().props.isAuth).toBeTruthy();
  });

  describe('when clicking on user avatar', () => {
    test('should call `_toggleAvatarDropdown`', () => {
      const stopPropagation = jest.fn();
      const newProps = { ...props };
      newProps.isAuth = true;
      newProps.user.image = 'image_url';
      wrapper = shallow(<Header {...newProps} />);
      wrapper.find('.user-avatar').simulate('click', { stopPropagation });
      expect(stopPropagation).toHaveBeenCalled();
    });
  });

  describe('when clicking on menu hamburger', () => {
    test('should call `_toggleHamburger`', () => {
      const stopPropagation = jest.fn();
      wrapper = shallow(<Header {...props} />);
      wrapper.find('.navbar-burger.burger').simulate('click', { stopPropagation });
      expect(stopPropagation).toHaveBeenCalled();
    });
  });

  describe('when clicking `Sign In', () => {
    test('should call `_setAuthModal`', () => {
      wrapper = shallow(<Header {...props} />);
      wrapper.find('.signin-btn').simulate('click');
      expect(props._setAuthModal).toHaveBeenCalledWith('Sign In');
    });
  });

  describe('when clicking `Sign Up', () => {
    test('should call `_setAuthModal`', () => {
      wrapper = shallow(<Header {...props} />);
      wrapper.find('.signup-btn').simulate('click');
      expect(props._setAuthModal).toHaveBeenCalledWith('Sign Up');
    });
  });

  describe('actions creators', () => {
    test('should dispatch `_setDepartment`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setDepartment();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_setCartModal`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setCartModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_setAuthModal`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setAuthModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch `_signout`', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._signout();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});