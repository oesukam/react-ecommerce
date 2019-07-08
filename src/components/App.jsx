import React, { Component } from 'react';
import propTypes from 'prop-types';
import Routes from './Routes';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchCategories, fetchDepartments } from '../actions/itemActions';
import { fetchShippingRegions } from '../actions/shippingActions';
import { fetchCurrentUser } from '../actions/currentUserActions';
import './App.scss';
import { fetchAllTax, fetchOrders } from '../actions/orderActions';
import { generateCartId } from '../actions/cartActions';
import AuthModal from '../components/AuthModal/AuthModal';
import MyCartModal from '../components/MyCartModal/MyCartModal';
import OrderModal from '../components/OrderModal/OrderModal';

export class App extends Component {
  componentDidMount() {
    this.props._fetchCategories();
    this.props._fetchDepartments();
    this.props._fetchAllTax();
    this.props._fetchShippingRegions();
    if (this.props.isAuth) {
      this.props._fetchCurrentUser();
      this.props._fetchOrders();
    }
    if (!this.props.cartId) {
      this.props._generateCartId();
    }
  }
  render() {
    const { isAuth, authModal, cartModal, orderModal } = this.props;
    return (
      <Router>
        {authModal ? <AuthModal title={authModal} /> : null}
        {cartModal ? <MyCartModal /> : null}
        {orderModal && isAuth ? <OrderModal /> : null}
        <Routes />
      </Router>
    )
  }
}

App.propTypes = {
  isAuth: propTypes.bool.isRequired,
  authModal: propTypes.string.isRequired,
  cartModal: propTypes.bool.isRequired,
  orderModal: propTypes.string.isRequired,
  cartId: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.number.isRequired,
  ]),
  _fetchCategories: propTypes.func.isRequired,
  _fetchDepartments: propTypes.func.isRequired,
  _fetchCurrentUser: propTypes.func.isRequired,
  _fetchAllTax: propTypes.func.isRequired,
  _fetchShippingRegions: propTypes.func.isRequired,
  _fetchOrders: propTypes.func.isRequired,
  _generateCartId: propTypes.func.isRequired,
};

export const mapStateToProps = ({
  currentUser: { isAuth, authModal },
  cart: { cartModal },
  order: { orderModal },
  cart: {
    cartProductForm: { cart_id: cartId },
  }
}) => ({
  isAuth,
  cartId,
  authModal,
  cartModal,
  orderModal,
})

export const mapDispatchToProps = dispatch => ({
  _fetchCategories: () => dispatch(fetchCategories()),
  _fetchDepartments: () => dispatch(fetchDepartments()),
  _fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  _fetchAllTax: () => dispatch(fetchAllTax()),
  _fetchShippingRegions: () => dispatch(fetchShippingRegions()),
  _fetchOrders: () => dispatch(fetchOrders()),
  _generateCartId: () => dispatch(generateCartId()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
