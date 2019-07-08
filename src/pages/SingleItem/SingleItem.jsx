import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Notification from 'react-bulma-notification';
import './SingleItem.scss';
import Layout from '../../containers/Layout/Layout';
import { fetchItem, fetchItemAttributes } from '../../actions/itemActions';
import {
  generateCartId,
  setCartProductFormField,
  submitCartProduct,
} from '../../actions/cartActions';
import Quantity from '../../components/Quantity/Quantity';

export class SingleItem extends Component {
  state = {
    selectedImage: '',
  };

  componentDidMount() {
    const {
      _getItem,
      _getItemAttributes,
      match: {
        params: { productId },
      },
    } = this.props;

    _getItem(productId).then(data => {
      this.setState({
        selectedImage: (data && data.image) || '',
      });
    });
    _getItemAttributes(productId);
  }

  _onQuantityChange = value => {
    const { _setCartField } = this.props;
    _setCartField({ name: 'quantity', value });
  };

  _setSelectedImage = selectedImage => {
    this.setState({ selectedImage });
  };

  addToCart = () => {
    const { cartProductForm, item, _getCartId, _addToCart, cartProducts, } = this.props;
    const message = `${item.name} was added to your cart`;
    const attributes = [cartProductForm.size, cartProductForm.color].join(', ');

    const data = {
      cart_id: cartProductForm.cart_id,
      product_id: item.product_id,
      quantity: cartProductForm.quantity,
      attributes,
      item: cartProducts.find(product => {
        return product.product_id === item.product_id &&
        product.attributes === attributes
      }),
    };

    if (!cartProductForm.size || !cartProductForm.color) {
      Notification.error('Please choose your color and size', { duration: 4 })
      return;
    }

    const failedError = 'Could not add to the cart. Please try again';
    if (!data.cart_id) {
      _getCartId().then((res) => {
        if(!res.cart_id) {
          Notification.error(failedError, { duration: 4 })
          return;
        }
        _addToCart(data)
          .then((res) => {
            if (!res) {
              Notification.error(failedError, { duration: 4 })
              return;
            }
            Notification.success(message, { duration: 5 })
          });
      });
      return;
    }
    _addToCart(data).then((res) => {
      if (!res) {
        Notification.error(failedError, { duration: 4 })
        return;
      }
      Notification.success(message, { duration: 5 })
    })
  };

  _renderItemImages = () => {
    const { selectedImage } = this.state;
    const { item } = this.props;
    const folder = '/product_images';

    return (
      <div className="images">
        <div className="images__view">
          <img src={`${folder}/${selectedImage}`} alt="Item cover" />
        </div>
        <div className="images__views">
          <img
            src={`${folder}/${item.image}`}
            className={`images__views__img ${selectedImage === item.image ? 'active' : ''}`}
            alt="Item cover"
            onClick={() => this._setSelectedImage(item.image)}
          />
          <img
            onClick={() => this._setSelectedImage(item.image_2)}
            className={`images__views__img ${selectedImage === item.image_2 ? 'active' : ''}`}
            src={`${folder}/${item.image_2}`}
            alt="Item cover"
          />
        </div>
      </div>
    );
  };

  _renderColors = () => {
    const {
      itemAttributes: { Color },
      cartProductForm: { color: selectedColor },
      _setCartField,
    } = this.props;

    if (!Color.length) return;

    return (
      <React.Fragment>
        <h2 className="product__info">Color</h2>
        <div className="color-block">
          {Color.map(c => (
            <span
              key={c.attribute_value_id}
              className={`color-box ${
                c.attribute_value === selectedColor ? 'selected' : ''
              }`}
              style={{ backgroundColor: c.attribute_value }}
              onClick={() =>
                _setCartField({ name: 'color', value: c.attribute_value })
              }
            />
          ))}
        </div>
      </React.Fragment>
    );
  };

  _renderSize = () => {
    const {
      itemAttributes: { Size },
      cartProductForm: { size: selectedSize },
      _setCartField,
    } = this.props;

    if (!Size.length) return;

    return (
      <React.Fragment>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h2 className="product__info">Size</h2>
            </div>
          </div>
          <div className="level-left">
            <div className="level-item">
              <h2 className="product__info-light">Size Guide</h2>
            </div>
          </div>
        </div>

        <div className="size-blocks">
          {Size.map(s => (
            <div
              key={s.attribute_value_id}
              className={`size-block ${
                s.attribute_value === selectedSize ? 'selected' : ''
              }`}
              onClick={() =>
                _setCartField({ name: 'size', value: s.attribute_value })
              }
            >
              {s.attribute_value}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  _renderItemDescription = () => {
    const { item, cartProductForm, submittingCartProduct } = this.props;
    return (
      <div className="product">
        <h3 className="product__name">{item.name}</h3>
        <h3 className={`product__price ${item.discounted_price > 0 && 'has-discount'}`}>$ {item.price}</h3>
        {
          item.discounted_price > 0 ?
            <h3 className="product__price">
              $ {item.discounted_price}
            </h3>
          : null
        }

        {this._renderColors()}

        {this._renderSize()}

        <h2 className="product__info">Quantity</h2>
        <Quantity
          quantity={cartProductForm.quantity}
          onQuantityChange={this._onQuantityChange}
        />
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <button
                onClick={this.addToCart}
                className={`product__add-btn ${
                  submittingCartProduct ? 'loading' : ''
                }`}
                disabled={submittingCartProduct}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button
                className={`product__wish-btn ${
                  submittingCartProduct ? 'is-loading' : ''
                }`}
              >
                <i className="fa fa-heart" />
                Add to Wish List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  _renderProductReviews = () => {
    return (
      <div className="product-reviews">
        <h1>Product reviews</h1>
        <div className="columns is-multiline">
          <div className="column is-6">Product</div>
        </div>
      </div>
    );
  };

  render() {
    const { history, match } = this.props;
    return (
      <Layout history={history} match={match}>
        <div className="container">
          <div className="product-container">
            <div className="columns">
              <div className="column is-6">{this._renderItemImages()}</div>
              <div className="column is-6">{this._renderItemDescription()}</div>
            </div>
          </div>
          {this._renderProductReviews()}
        </div>
      </Layout>
    );
  }
}

SingleItem.propTypes = {
  item: propTypes.object.isRequired,
  loadingItem: propTypes.bool.isRequired,
  cartProductForm: propTypes.object.isRequired,
  submittingCartProduct: propTypes.bool.isRequired,
  itemAttributes: propTypes.object.isRequired,
  cartProducts: propTypes.array.isRequired,
  _getItem: propTypes.func.isRequired,
  _getCartId: propTypes.func.isRequired,
  _setCartField: propTypes.func.isRequired,
  _addToCart: propTypes.func.isRequired,
  _getItemAttributes: propTypes.func.isRequired,
};

export const mapStateToProps = ({
  item: { loadingItem, item, itemAttributes },
  cart: { cartProductForm, submittingCartProduct, cartProducts },
}) => ({
  item,
  loadingItem,
  cartProductForm,
  submittingCartProduct,
  itemAttributes,
  cartProducts,
});

export const mapDispatchToProps = dispatch => ({
  _getItem: payload => dispatch(fetchItem(payload)),
  _getCartId: () => dispatch(generateCartId()),
  _setCartField: payload => dispatch(setCartProductFormField(payload)),
  _addToCart: payload => dispatch(submitCartProduct(payload)),
  _getItemAttributes: payload => dispatch(fetchItemAttributes(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleItem);
