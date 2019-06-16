import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
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
      getItem,
      getItemAttributes,
      match: {
        params: { productId },
      },
    } = this.props;

    getItem(productId).then(data => {
      this.setState({
        selectedImage: (data && data.image) || '',
      });
    });
    getItemAttributes(productId);
  }

  _onQuantityChange = value => {
    const { setCartField } = this.props;
    setCartField({ name: 'quantity', value });
  };

  _setSelecteedImage = selectedImage => {
    this.setState({ selectedImage });
  };

  _addToCart = () => {
    const { cartProductForm, item, getCartId, addToCart } = this.props;
    const data = {
      cart_id: cartProductForm.cart_id,
      product_id: item.product_id,
      attributes: [cartProductForm.size, cartProductForm.color].join(', '),
      quantity: cartProductForm.quantity,
    };
    if (!data.cart_id) {
      getCartId().then(() => {
        addToCart(cartProductForm);
      });
      return;
    }
    addToCart(data);
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
            className={selectedImage === item.image ? 'active' : ''}
            alt="Item cover"
            onClick={() => this._setSelecteedImage(item.image)}
          />
          <img
            onClick={() => this._setSelecteedImage(item.image_2)}
            className={selectedImage === item.image_2 ? 'active' : ''}
            src={`${folder}/${item.image_2}`}
            alt="Item cover"
          />
        </div>
      </div>
    );
  };

  _renderColors = () => {
    const {
      itemAttributes: { Color = [] },
      cartProductForm: { color: selectedColor },
      setCartField,
    } = this.props;

    if (Color.length === 0) return;

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
                setCartField({ name: 'color', value: c.attribute_value })
              }
            />
          ))}
        </div>
      </React.Fragment>
    );
  };

  _renderSize = () => {
    const {
      itemAttributes: { Size = [] },
      cartProductForm: { size: selectedSize },
      setCartField,
    } = this.props;

    if (Size.length === 0) return;

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
                setCartField({ name: 'size', value: s.attribute_value })
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
        <h3 className="product__price">£ {item.price}</h3>

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
                onClick={this._addToCart}
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
  item: propTypes.object,
  loadingItem: propTypes.bool,
  cartProductForm: propTypes.object,
};
export const mapStateToProps = ({
  item: { loadingItem, item, itemAttributes },
  cart: { cartProductForm, submittingCartProduct },
}) => ({
  item,
  loadingItem,
  cartProductForm,
  submittingCartProduct,
  itemAttributes,
});

export const mapDispactToProps = dispatch => ({
  getItem: payload => dispatch(fetchItem(payload)),
  getCartId: () => dispatch(generateCartId()),
  setCartField: payload => dispatch(setCartProductFormField(payload)),
  addToCart: payload => dispatch(submitCartProduct(payload)),
  getItemAttributes: payload => dispatch(fetchItemAttributes(payload)),
});

export default connect(
  mapStateToProps,
  mapDispactToProps,
)(SingleItem);
