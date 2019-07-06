import React from 'react';
import { shallow, mount } from 'enzyme';
import { AuthModal, mapDispatchToProps, mapStateToProps } from '../../components/AuthModal/AuthModal';
import initialState from '../../store/initialState';

let wrapper;

const props = {
  title: '',
  authForm: {
    name: { valid: true, value: '' },
    email: { valid: true, value: '' },
    password: { valid: true, value: '' }
  },
  userError: {
    field: '',
    message: 'message'
  },
  loggingIn: false,
  signingUp: false,
  _setAuthModal: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _handleInput: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _submitLogin: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _submitRegister: jest.fn().mockImplementation(() => Promise.resolve({ customer: {} })),
  _clearAuthForm: jest.fn().mockImplementation(() => Promise.resolve(true)),
}

describe('AuthModal.jsx', () => {
  test('should render AuthModal.jx', () => {
    wrapper = shallow(
      <AuthModal {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render AuthModal.jx with Signup', () => {
    const title = 'Sign Up'
    const newProps = { ...props };
    newProps.title = title;
    wrapper = shallow(
      <AuthModal {...newProps} />
    );
    expect(wrapper.instance().props.title).toBe(title);
  });

  describe('user errors signin', () => {
    test('should render with email error', () => {
      const newProps = { ...props };
      newProps.authForm.email.valid = false
      newProps.userError.field = 'email'
      wrapper = shallow(
        <AuthModal {...newProps} />
      );
      expect(wrapper.instance().props.authForm.email.valid).toBeFalsy();
    });

    test('should render with password error', () => {
      const newProps = { ...props };
      newProps.authForm.password.valid = false
      newProps.userError.field = 'password'
      wrapper = shallow(
        <AuthModal {...newProps} />
      );
      expect(wrapper.instance().props.authForm.password.valid).toBeFalsy();
    });
  });

  describe('user errors signup', () => {
    test('should render with name error', () => {
      const newProps = { ...props };
      newProps.title = 'Sign Up'
      newProps.authForm.name.valid = false
      newProps.userError.field = 'name'
      wrapper = shallow(
        <AuthModal {...newProps} />
      );
      expect(wrapper.instance().props.authForm.name.valid).toBeFalsy();
    });

    test('should render with email error', () => {
      const newProps = { ...props };
      newProps.title = 'Sign Up'
      newProps.authForm.email.valid = false
      newProps.userError.field = 'email'
      wrapper = shallow(
        <AuthModal {...newProps} />
      );
      expect(wrapper.instance().props.authForm.email.valid).toBeFalsy();
    });

    test('should render with password error', () => {
      const newProps = { ...props };
      newProps.title = 'Sign Up'
      newProps.authForm.password.valid = false
      newProps.userError.field = 'password'
      wrapper = shallow(
        <AuthModal {...newProps} />
      );
      expect(wrapper.instance().props.authForm.password.valid).toBeFalsy();
    });
  });

  describe('when clicking on `close modal`', () => {
    test('should call the `_setAuthModal` action', () => {
      wrapper = shallow(<AuthModal {...props} />);
      wrapper.find('.modal-close-btn').simulate('click');
      expect(props._setAuthModal).toHaveBeenCalled();
    })
  });

  describe('when clicking on `login`', () => {
    test('should call the `login` action with invalid email', () => {
      const newProps = props;
      const preventDefault = jest.fn()
      newProps.authForm.email.valid = false
      wrapper = shallow(<AuthModal {...newProps} />);
      wrapper.find('button[data-test="login-btn"]').simulate('click', { preventDefault });
      expect(preventDefault).toHaveBeenCalled();
    })

    test('should call the `login` action with invalid password', () => {
      const newProps = props;
      const preventDefault = jest.fn()
      newProps.authForm.email.valid = true
      newProps.authForm.password.valid = false
      wrapper = shallow(<AuthModal {...newProps} />);
      wrapper.find('button[data-test="login-btn"]').simulate('click', { preventDefault });
      expect(preventDefault).toHaveBeenCalled();
    })

    test('should call the `login` action', () => {
      const newProps = { ...props };
      newProps.authForm.email.value = 'email@email.com';
      newProps.authForm.email.valid = true;
      newProps.authForm.password.value = 'password';
      newProps.authForm.password.valid = true;
      newProps.loggingIn = true;
      wrapper = shallow(<AuthModal {...newProps} />);
      wrapper.find('button[data-test="login-btn"]').simulate('click', { preventDefault: jest.fn() });
      expect(newProps._submitLogin).toHaveBeenCalled();
    })
  });

  describe('when clicking on Create account', () => {
    test('should call the `_setAuthModal` action with invalid data', () => {
      wrapper = mount(<AuthModal {...props} />);
      wrapper.find('#create-account').simulate('click');
      expect(props._setAuthModal).toHaveBeenCalled()
    });
  });

  describe('when clicking on Signin', () => {
    test('should call the `_setAuthModal` action with invalid data', () => {
      const newProps = { ...props };
      newProps.title = 'Sign Up';
      wrapper = mount(<AuthModal {...newProps} />);
      wrapper.find('#signin-btn').simulate('click');
      expect(props._setAuthModal).toHaveBeenCalled()
    });
  });

  describe('when clicking on `register`', () => {

    test('should call the `register` action with invalid data', () => {
      const newProps = props;
      newProps.title = 'Sign Up'
      newProps.authForm.email.valid = false
      newProps.authForm.email.value = 'email@email.com';
      newProps.authForm.password.value = 'password';
      wrapper = mount(<AuthModal {...newProps} />);
      wrapper.find('button[data-test="register-btn"]').simulate('click', { preventDefault: jest.fn() });
      expect(wrapper.props().authForm.email.valid).toBeFalsy();
    });


    test('should call the `register` action without a response', () => {
      const preventDefault = jest.fn();
      const newProps = props;
      newProps.title = 'Sign Up';
      newProps.authForm.email.valid = true;
      newProps.authForm.email.value = 'email@email.com';
      newProps.authForm.name.valid = true;
      newProps.authForm.name.value = 'name';
      newProps.authForm.password.valid = true;
      newProps.authForm.password.value = 'password';
      newProps._submitRegister = jest.fn().mockImplementation(() => Promise.resolve(true))
      wrapper = mount(<AuthModal {...newProps} />);
      wrapper.find('button[data-test="register-btn"]').simulate('click', { preventDefault });
      expect(newProps._submitRegister).toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalled();
    });

    test('should call the `register` action', () => {
      const newProps = props;
      newProps.title = 'Sign Up';
      newProps.authForm.email.valid = true;
      newProps.authForm.email.value = 'email@email.com';
      newProps.authForm.name.valid = true;
      newProps.authForm.name.value = 'name';
      newProps.authForm.password.valid = true;
      newProps.authForm.password.value = 'password';
      newProps.signingUp = true;
      newProps._submitRegister = jest.fn().mockImplementation(() => Promise.resolve({ customer: {} }))
      wrapper = mount(<AuthModal {...newProps} />);
      wrapper.find('button[data-test="register-btn"]').simulate('click', { preventDefault: jest.fn() });
      expect(newProps._submitRegister).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('loggingIn')
    })
  });

  describe('actions creators', () => {
    test('should call _setAuthModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setAuthModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _handleInput action', () => {
      const event = { target: { name: 'name', value: 'value' }};
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(event));
      mapDispatchToProps(dispatch)._handleInput(event);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitLogin action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitLogin();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitRegister action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitRegister();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _clearAuthForm action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._clearAuthForm();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
