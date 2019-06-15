import React, { Component } from 'react';
import './SingleItem.scss';
import Layout from '../../containers/Layout/Layout';
import { connect } from 'react-redux';
import { fetchItem } from '../../actions/itemActions';
import propTypes from 'prop-types';

export class SingleItem extends Component {
  state = {
    selectedImage: '',
  };
  componentDidMount() {
    const {
      getItem,
      match: {
        params: { productId },
      },
    } = this.props;

    getItem(productId).then(data => {
      this.setState({
        selectedImage: data.image,
      });
    });
  }

  setSelecteedImage = selectedImage => {
    this.setState({ selectedImage });
  };

  renderItemImages = () => {
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
            onClick={() => this.setSelecteedImage(item.image)}
          />
          <img
            onClick={() => this.setSelecteedImage(item.image_2)}
            className={selectedImage === item.image_2 ? 'active' : ''}
            src={`${folder}/${item.image_2}`}
            alt="Item cover"
          />
        </div>
      </div>
    );
  };

  renderItemDescription = () => {
    const { item, itemForm } = this.props;
    console.log('==', itemForm);
    return (
      <div className="product">
        <h3 className="product__name">{item.name}</h3>
        <h3 className="product__price">£ {item.price}</h3>

        <h2 className="product__info">Size</h2>
        <div>
          <span className="color-box bg-blue selected" />
          <span className="color-box bg-cyan" />
          <span className="color-box bg-red" />
          <span className="color-box bg-orange" />
          <span className="color-box bg-yellow" />
          <span className="color-box bg-green" />
          <span className="color-box bg-purple" />
        </div>

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
          <div
            className={`size-block ${itemForm.size === 'XS' ? 'selected' : ''}`}
          >
            XS
          </div>
          <div
            className={`size-block ${itemForm.size === 'S' ? 'selected' : ''}`}
          >
            S
          </div>
          <div
            className={`size-block ${itemForm.size === 'M' ? 'selected' : ''}`}
          >
            M
          </div>
          <div
            className={`size-block ${itemForm.size === 'L' ? 'selected' : ''}`}
          >
            L
          </div>
          <div
            className={`size-block ${itemForm.size === 'XL' ? 'selected' : ''}`}
          >
            XL
          </div>
        </div>

        <h2 className="product__info">Quantity</h2>
        <div className="product__quantity">
          <button className="product__quantity--icon">
            <i className="fa fa-minus" />
          </button>
          <span className="product__quantity--count">{itemForm.quantity}</span>
          <button className="product__quantity--icon">
            <i className="fa fa-plus" />
          </button>
        </div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <button className="product__add-btn">Add to cart</button>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button className="product__wish-btn">
                <i className="fa fa-heart" />
                Add to Wish List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderProductReviews = () => {
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
              <div className="column is-6">{this.renderItemImages()}</div>
              <div className="column is-6">{this.renderItemDescription()}</div>
            </div>
          </div>
          {this.renderProductReviews()}
        </div>
      </Layout>
    );
  }
}

SingleItem.propTypes = {
  item: propTypes.object,
  loadingItem: propTypes.bool,
  itemForm: propTypes.object,
};
export const mapStateToProps = ({ item: { loadingItem, item, itemForm } }) => ({
  item,
  loadingItem,
  itemForm,
});

export const mapDispactToProps = dispatch => ({
  getItem: payload => dispatch(fetchItem(payload)),
});

export default connect(
  mapStateToProps,
  mapDispactToProps,
)(SingleItem);
