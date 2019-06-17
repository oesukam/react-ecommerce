import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './AuthModal.scss';
import {
  submitLogin,
  submitRegister,
  setAuthFormField,
  clearAuthForm,
  setAuthModal,
} from '../../actions/currentUserActions';
import closeIcon from '../../assets/icons/icons-close-big-black.png';

export class AuthModal extends Component {
  state = {
    password: false,
    email: false,
    username: false,
  };

  componentDidMount() {
    const { _clearAuthForm } = this.props;
    _clearAuthForm();
  }

  _login = e => {
    e.preventDefault();
    const { _submitLogin, authForm } = this.props;
    if (!authForm.email.valid || !authForm.password.valid) {
      return;
    }
    _submitLogin({
      email: authForm.email.value,
      password: authForm.password.value,
    });
  };

  _register = e => {
    e.preventDefault();
    const { _submitRegister, authForm, _setAuthModal } = this.props;
    if (
      !authForm.email.valid ||
      !authForm.password.valid ||
      !authForm.name.valid
    ) {
      return;
    }
    _submitRegister({
      email: authForm.email.value,
      password: authForm.password.value,
      name: authForm.name.value,
    }).then(data => {
      if (data.customer) {
        _setAuthModal('');
      }
    });
  };

  _renderSignin = () => {
    const {
      userError,
      _handleInput,
      authForm,
      title,
      loggingIn,
      _setAuthModal,
    } = this.props;
    return (
      <form onSubmit={this._login}>
        <p className="help is-danger">
          {userError.field === '' && userError.message ? userError.message : ''}
        </p>
        <div className="field">
          <div className="control">
            <input
              name="email"
              onChange={_handleInput}
              className={`input ${!authForm.email.valid ? 'is-danger' : ''}`}
              type="email"
              placeholder="Email"
              value={authForm.email.value}
              required
            />
          </div>
          <p className="help is-danger">
            {userError.field === 'email' ? userError.message : ''}
          </p>
        </div>
        <div className="field">
          <div className="control">
            <input
              name="password"
              onChange={_handleInput}
              className={`input ${!authForm.password.valid ? 'is-danger' : ''}`}
              type="password"
              placeholder="password"
              value={authForm.password.value}
              required
            />
          </div>
          <p className="help is-danger">
            {userError.field === 'password' ? userError.message : ''}
          </p>
        </div>

        <button
          type="submit"
          onClick={this._login}
          disabled={!authForm.email.value || !authForm.password.value}
          className={`auth-btn ${loggingIn ? 'loading' : ''}`}
        >
          {title}
        </button>

        <div className="level">
          <div className="level-left">
            <button onClick={this._toGoShop} className="bottom-btn">
              Forgot password
            </button>
          </div>
          <div className="level-right">
            <button
              onClick={() => _setAuthModal('Register')}
              className="bottom-btn"
            >
              Crate an account
            </button>
          </div>
        </div>
      </form>
    );
  };

  _renderRegister = () => {
    const {
      userError,
      _handleInput,
      authForm,
      title,
      signingUp,
      _setAuthModal,
    } = this.props;
    return (
      <form onSubmit={this._login}>
        <p className="help is-danger">
          {userError.field === '' && userError.message ? userError.message : ''}
        </p>
        <div className="field">
          <div className="control">
            <input
              name="name"
              onChange={_handleInput}
              className={`input ${!authForm.name.valid ? 'is-danger' : ''}`}
              type="text"
              placeholder="Names"
              value={authForm.name.value}
              required
            />
          </div>
          <p className="help is-danger">
            {userError.field === 'name' ? userError.message : ''}
          </p>
        </div>
        <div className="field">
          <div className="control">
            <input
              name="email"
              onChange={_handleInput}
              className={`input ${!authForm.email.valid ? 'is-danger' : ''}`}
              type="email"
              placeholder="Email"
              value={authForm.email.value}
              required
            />
          </div>
          <p className="help is-danger">
            {userError.field === 'email' ? userError.message : ''}
          </p>
        </div>
        <div className="field">
          <div className="control">
            <input
              name="password"
              onChange={_handleInput}
              className={`input ${!authForm.password.valid ? 'is-danger' : ''}`}
              type="password"
              placeholder="password"
              value={authForm.password.value}
              required
            />
          </div>
          <p className="help is-danger">
            {userError.field === 'password' ? userError.message : ''}
          </p>
        </div>

        <button
          type="submit"
          onClick={this._register}
          disabled={!authForm.email.value || !authForm.password.value}
          className={`auth-btn ${signingUp ? 'loading' : ''}`}
        >
          {title}
        </button>

        <div className="has-text-centered mt-20 mb-20">
          <button
            onClick={() => _setAuthModal('Sign In')}
            className="bottom-btn"
          >
            Have an account
          </button>
        </div>
      </form>
    );
  };

  _toGoShop = () => {
    const { _setCartModal } = this.props;
    _setCartModal();
  };

  _checkout = () => {
    console.log('checkout');
  };

  _empty = () => {
    const { _submitEmptyCart, cartId, _setCartModal } = this.props;
    _submitEmptyCart(cartId).then(() => {
      _setCartModal();
    });
  };

  render() {
    const { _setAuthModal, title } = this.props;
    return (
      <div className="modal is-active modal-view auth">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <img
              className="modal-close-btn"
              src={closeIcon}
              alt="Close cicon"
              aria-label="close"
              onClick={() => _setAuthModal('')}
            />
            <h1 className="modal-card-title">{title}</h1>
          </header>
          <section className="modal-card-body">
            {title === 'Register'
              ? this._renderRegister()
              : this._renderSignin()}
          </section>
        </div>
      </div>
    );
  }
}

AuthModal.propTypes = {
  cartProducts: propTypes.array,
  title: propTypes.string,
};

AuthModal.defaultProps = {
  cartProducts: [],
  title: '',
};

export const mapStateToProps = ({
  currentUser: { userError, authForm, loggingIn, signingUp },
}) => ({
  authForm,
  loggingIn,
  signingUp,
  userError,
});

export const mapDispatchToProps = dispatch => ({
  _setAuthModal: payload => dispatch(setAuthModal(payload)),
  _handleInput: ({ target: { value, name } }) =>
    dispatch(setAuthFormField({ name, value })),
  _submitLogin: payload => dispatch(submitLogin(payload)),
  _submitRegister: payload => dispatch(submitRegister(payload)),
  _clearAuthForm: () => dispatch(clearAuthForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthModal);
