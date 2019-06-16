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

export class Header extends Component {
  renderAuthNav = () => {
    const { isAuth, user, cartCount, _setCartModal } = this.props;
    if (isAuth)
      return <img className="user-avatar" src={user.image} alt="User avatar" />;
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

  renderTop = () => {
    const { cartCount, _setCartModal, cartTotalAmount } = this.props;
    return (
      <div className="nav-top">
        <div className="container">
          <div className="is-flex content-space-between">
            <div className="is-flex items-center">
              Hi! <button className="auth-btn mr-10 ml-10">Sign in</button> or
              <button className="auth-btn ml-10">Register</button>
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
  currentUser: { isAuth },
  item: { departments },
  cart: { cartProducts, cartTotalAmount },
}) => ({
  isAuth,
  departments,
  cartCount: cartProducts.length || 0,
  cartTotalAmount,
});

export const mapDispatchToProps = disptach => ({
  setDepartment: payload => disptach(setDepartmentId(payload)),
  _setCartModal: () => disptach(setCartModal(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
