import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './MyCart.scss';
import {
  setCartModal,
  submitCartProductUpdate,
  fetchCartProducts,
  submitDeleteCartItem,
  submitEmptyCart,
} from '../../actions/cartActions';
import Quantity from '../../components/Quantity/Quantity';
import closeIcon from '../../assets/icons/icons-close-big-black.png';

export class MyCart extends Component {
  componentDidMount() {
    const { cartId, _fetchCartProducts } = this.props;
    if (cartId) {
      _fetchCartProducts(cartId);
    }
  }

  _onQuantityChange = (quantity, itemId) => {
    const { _updateCartProduct, cartId } = this.props;
    _updateCartProduct({ cartId, itemId, item: { quantity } });
  };

  _renderItems = () => {
    const { cartProducts, _submitDeleteCartItem } = this.props;

    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Item</th>
            <th className="has-text-centered">Size</th>
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
                        item.deleting ? 'is-loading' : ''
                      }`}
                      onClick={() => _submitDeleteCartItem(item.item_id)}
                    >
                      <i className="fa fa-times color-red mr-10" />
                      Delete
                    </button>
                  </div>
                </div>
              </td>
              <td>
                {item.attributes.split(',').length > 0
                  ? item.attributes.split(',')[0]
                  : ''}
              </td>
              <td className="quantity">
                <Quantity
                  quantity={item.quantity}
                  onQuantityChange={quantity =>
                    this._onQuantityChange(quantity, item.item_id)
                  }
                />
              </td>
              <td className="price">£{item.price}</td>
              <td className="price">£{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    const {
      _setCartModal,
      cartProductsCount,
      cartId,
      clearingCart,
    } = this.props;
    return (
      <div className="modal is-active cart-modal">
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
            <button onClick={this._checkout} className="checkout-btn">
              Checkout
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

MyCart.propTypes = {
  cartProducts: propTypes.array,
};

MyCart.defaultProps = {
  cartProducts: [],
};

export const mapStateToProps = ({
  cart: {
    cartProducts,
    cartProductForm: { cart_id: cartId },
    clearingCart,
  },
}) => ({
  cartProducts,
  cartProductsCount: cartProducts.length || 0,
  cartId,
  clearingCart,
});

export const mapDispatchToProps = dispatch => ({
  _setCartModal: () => dispatch(setCartModal(false)),
  _updateCartProduct: payload => dispatch(submitCartProductUpdate(payload)),
  _fetchCartProducts: payload => dispatch(fetchCartProducts(payload)),
  _submitDeleteCartItem: payload => dispatch(submitDeleteCartItem(payload)),
  _submitEmptyCart: payload => dispatch(submitEmptyCart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCart);
