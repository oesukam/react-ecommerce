import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import bagWhiteIcon from '../../assets/icons/icons-bag-white.png';
import bagBlackIcon from '../../assets/icons/icons-bag.png';
import closeSmallIcon from '../../assets/icons/icons-close-small-white.png';
import searchIcon from '../../assets/icons/icons-search-white.png';
import UKFlag from '../../assets/icons/gbr.png';
import { setDepartmentId } from '../../actions/itemActions';
import { setCartModal } from '../../actions/cartActions';
import { setAuthModal, signout } from '../../actions/currentUserActions';
import userAvatar from '../../assets/icons/avatar.svg';

export class Header extends Component {
  state = {
    avatarDropdown: false,
  };

  renderAuthNav = () => {
    const { isAuth, cartCount, _setCartModal } = this.props;
    if (isAuth) return this._renderAvatar();
    return (
      <div className="buttons">
        <div className="nav-cart" onClick={_setCartModal}>
          <img src={bagWhiteIcon} className="nav-cart__image" alt="Nav cart" />
          <div className="nav-cart__counter bg-white color-red">
            {cartCount}
          </div>
        </div>
      </div>
    );
  };

  _toggleAvatarDropdown = e => {
    e.stopPropagation();
    const { avatarDropdown } = this.state;
    this.setState({
      avatarDropdown: !avatarDropdown,
    });
  };

  _renderAvatar = () => {
    const { user, _signout } = this.props;
    const { avatarDropdown } = this.state;
    return (
      <div className="user">
        <img
          className="user-avatar"
          src={user && user.image ? user.image : userAvatar}
          alt="User avatar"
          onClick={this._toggleAvatarDropdown}
        />
        <div className={`drop-down ${avatarDropdown ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/settings">
                <i className="fa fa-cog" /> My Account
              </Link>
              <Link onClick={_signout} to="#">
                <i className="fa fa-sign-out-alt" /> Signout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  renderTop = () => {
    const {
      cartCount,
      _setCartModal,
      _setAuthModal,
      cartTotalAmount,
      isAuth,
      user,
    } = this.props;
    return (
      <div className="nav-top">
        <div className="container">
          <div className="is-flex content-space-between">
            <div className="is-flex items-center">
              Hi!
              {!isAuth ? (
                <React.Fragment>
                  <button
                    onClick={() => _setAuthModal('Sign In')}
                    className="auth-btn mr-10 ml-10"
                  >
                    Sign in
                  </button>{' '}
                  or
                  <button
                    onClick={() => _setAuthModal('Register')}
                    className="auth-btn ml-10"
                  >
                    Register
                  </button>
                </React.Fragment>
              ) : (
                <span className="color-red ml-10">{user.name}</span>
              )}
            </div>

            <div className="is-flex items-center">
              <Link to="/items" className="navbar-item">
                Daily Deals
              </Link>
              <Link to="/items" className="navbar-item">
                Sell
              </Link>
              <Link to="/items" className="navbar-item">
                Help & Contact
              </Link>
            </div>
            <div className="is-flex items-center mr-20">
              <img src={UKFlag} alt="UK Flag" className="mr-10" />£ GBP
            </div>
            <div className="is-flex content-flex-end items-center">
              <div>
                <div className="nav-cart" onClick={_setCartModal}>
                  <img
                    src={bagBlackIcon}
                    className="nav-cart__image"
                    alt="Nav cart"
                  />
                  <div className="nav-cart__counter bg-red color-white">
                    {cartCount}
                  </div>
                </div>
                <span className="ml-10">Your bag: £{cartTotalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderDepartments = () => {
    const {
      departments,
      match: {
        params: { departmentId },
      },
      setDepartment,
    } = this.props;
    const id = parseInt(departmentId, 10);
    setDepartment(id || '');

    return departments.map(dep => (
      <Link
        key={dep.department_id}
        to={`/departments/${dep.department_id}`}
        className={`navbar-item ${dep.department_id === id ? 'active' : ''}`}
      >
        {dep.name}
      </Link>
    ));
  };
  renderBottom = () => {
    return (
      <div className="nav-bottom">
        <div className="container">
          <div className="navbar">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <div className="brand-name">SHOPMATE</div>
              </Link>
              <button
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">{this.renderDepartments()}</div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="nav-search">
                    <img
                      src={searchIcon}
                      className="nav-search__loop"
                      alt="Search loop icon"
                    />
                    <input
                      className="nav-search__input"
                      placeholder="search anything"
                    />
                    <img
                      src={closeSmallIcon}
                      className="nav-search__close"
                      alt="Search close icon"
                    />
                  </div>
                </div>
                <div className="navbar-item">{this.renderAuthNav()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <nav
        id="fixed-nav"
        className="navbar"
        role="navigation"
        aria-label="main navigation"
      >
        {this.renderTop()}
        {this.renderBottom()}
      </nav>
    );
  }
}

export const mapStateToProps = ({
  currentUser: { isAuth, user },
  item: { departments },
  cart: { cartProducts, cartTotalAmount },
}) => ({
  isAuth,
  user,
  departments,
  cartCount: cartProducts.length || 0,
  cartTotalAmount,
});

export const mapDispatchToProps = disptach => ({
  setDepartment: payload => disptach(setDepartmentId(payload)),
  _setCartModal: () => disptach(setCartModal(true)),
  _setAuthModal: payload => disptach(setAuthModal(payload)),
  _signout: payload => disptach(signout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
