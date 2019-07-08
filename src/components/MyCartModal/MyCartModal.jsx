import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from 'react-bulma-notification';
import './MyCartModal.scss';
import {
  setCartModal,
  submitCartProductUpdate,
  fetchCartProducts,
  submitDeleteCartItem,
  submitEmptyCart,
} from '../../actions/cartActions';
import { setOrderModal } from '../../actions/orderActions';
import Quantity from '../Quantity/Quantity';
import closeIcon from '../../assets/icons/icons-close-big-black.png';
import { setAuthModal } from '../../actions/currentUserActions';

export class MyCartModal extends Component {
  componentDidMount() {
    const { cartId, _fetchCartProducts } = this.props;
    if (cartId) {
      _fetchCartProducts(cartId);
    }
  }

  _onQuantityChange = (quantity, itemId, price) => {
    const { _updateCartProduct, cartId } = this.props;
    _updateCartProduct({ cartId, itemId, item: { quantity, price } });
  };

  _renderItems = () => {
    const { cartProducts, _submitDeleteCartItem, cartId, cartTotalAmount } = this.props;
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Item</th>
            <th className="has-text-centered">Size</th>
            <th className="has-text-centered">Color</th>
            <th className="has-text-centered">Quantity</th>
            <th className="has-text-centered">Price</th>
            <th className="has-text-centered">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map(item => (
            <tr key={item.item_id}>
              <td>
                <div className="cart-item">
                  <img
                    className="cart-item__cover"
                    src={`/product_images/${item.image}`}
                    alt="Item cover"
                  />
                  <div className="cart-item__body">
                    <h1>{item.name}</h1>
                    <button
                      className={`cart-item__delete-btn ${
                        item.deleting ? 'loading' : ''
                      }`}
                      onClick={() =>
                        _submitDeleteCartItem({ itemId: item.item_id, cartId })
                      }
                    >
                      <i className="fa fa-times color-red mr-10" />
                      Delete
                    </button>
                  </div>
                </div>
              </td>
              <td className="has-text-centered">
                {item.attributes.split(',')[0] || '-'}
              </td>
              <td className="has-text-centered">
                {item.attributes.split(',')[1] || '-'}
              </td>
              <td className="quantity">
                <Quantity
                  quantity={item.quantity}
                  onQuantityChange={quantity =>
                    this._onQuantityChange(quantity, item.item_id, item.price)
                  }
                />
              </td>
              <td className="price">${item.price}</td>
              <td className="price">${Number(item.subtotal).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5"><h4 className="title is-4">Total</h4></td>
            <td><h4 className="title is-4 color-red has-text-centered">${cartTotalAmount}</h4></td>
          </tr>
        </tfoot>
      </table>
    );
  };

  _toGoShop = () => {
    this.props._setCartModal();
  };

  _checkout = () => {
    this.props._setCartModal();
    this.props._setOrderModal('Delivery');
    if (!this.props.isAuth) {
      Notification.warn('Please login before proceeding', { duration: 5 })
      this.props._setAuthModal('Sign In');
    }
  };

  _empty = () => {
    const { _submitEmptyCart, cartId, _setCartModal } = this.props;
    _submitEmptyCart(cartId).then(() => {
      _setCartModal();
      Notification.success('Your cart has been emptied successfully', { duration: 5 })
    });
  };

  render() {
    const {
      _setCartModal,
      cartProductsCount,
      cartId,
      clearingCart,
    } = this.props;
    return (
      <div className="modal is-active modal-view">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {cartProductsCount} Item{cartProductsCount > 1 ? 's' : ''} In Your
              Cart
            </p>
            <img
              className="modal-close-btn"
              src={closeIcon}
              alt="Close cicon"
              aria-label="close"
              onClick={_setCartModal}
            />
          </header>
          <section className="modal-card-body">{this._renderItems()}</section>
          <footer className="modal-card-foot">
            <button onClick={this._toGoShop} className="back-btn">
              Back to shop
            </button>
            <button
              disabled={!cartId || clearingCart}
              onClick={this._empty}
              className={`empty-cart-btn ${clearingCart ? 'loading' : ''}`}
            >
              Empty cart
            </button>
            <button
              disabled={cartProductsCount === 0}
              onClick={this._checkout}
              className="checkout-btn"
            >
              Checkout
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

MyCartModal.propTypes = {
  cartProducts: propTypes.array.isRequired,
  cartProductsCount: propTypes.number.isRequired,
  cartId: propTypes.any.isRequired,
  clearingCart: propTypes.bool.isRequired,
  isAuth: propTypes.bool.isRequired,
  cartTotalAmount: propTypes.oneOfType([
    propTypes.number.isRequired,
    propTypes.string.isRequired,
  ]),
  _setCartModal: propTypes.func.isRequired,
  _updateCartProduct: propTypes.func.isRequired,
  _fetchCartProducts: propTypes.func.isRequired,
  _submitDeleteCartItem: propTypes.func.isRequired,
  _submitEmptyCart: propTypes.func.isRequired,
  _setOrderModal: propTypes.func.isRequired,
  _setAuthModal: propTypes.func.isRequired,
};

export const mapStateToProps = ({
  cart: {
    cartProducts,
    cartProductForm: { cart_id: cartId },
    clearingCart,
    cartTotalAmount,
  },
  currentUser: {
    isAuth
  }
}) => ({
  cartProducts,
  cartProductsCount: cartProducts.length,
  cartId,
  clearingCart,
  isAuth,
  cartTotalAmount,
});

export const mapDispatchToProps = dispatch => ({
  _setCartModal: () => dispatch(setCartModal(false)),
  _updateCartProduct: payload => dispatch(submitCartProductUpdate(payload)),
  _fetchCartProducts: payload => dispatch(fetchCartProducts(payload)),
  _submitDeleteCartItem: payload => dispatch(submitDeleteCartItem(payload)),
  _submitEmptyCart: payload => dispatch(submitEmptyCart(payload)),
  _setOrderModal: payload => dispatch(setOrderModal(payload)),
  _setAuthModal: payload => dispatch(setAuthModal(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCartModal);
