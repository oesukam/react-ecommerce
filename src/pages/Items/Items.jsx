import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import queryString from 'query-string';
import Notification from 'react-bulma-notification';
import Layout from '../../containers/Layout/Layout';
import './Items.scss';
import {
  addItemToCart,
  setSearchKeywords,
  searchProducts,
  setSearchedItems,
} from '../../actions/itemActions';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import ItemsLoader from '../../components/ContentLoader/ItemsLoader';
import { generateCartId } from '../../actions/cartActions';

export class Items extends Component {
  componentDidMount() {
    const { location } = this.props;
    const { page = 1, search: searchKeywords } = queryString.parse(
      location.search,
    );

    this.props._searchProducts({ page, searchKeywords: searchKeywords || '' });
    this.props._setSearchKeywords(searchKeywords || '');
  }

  _addToCart = (itemId, item) => {
    const { cartId, _generateCartId, _addItemToCart } = this.props;
    const message = `${item.name} was added to your cart`;
    if (!cartId) {
      _generateCartId().then(({ cart_id: cartId }) => {
        _addItemToCart({ cartId, itemId })
          .then((res) => {
            if (res) Notification.success(message, { duration: 3 });
          });
      });
      return;
    }
    _addItemToCart({ cartId, itemId })
      .then((res) => {
        if (res) Notification.success(message, { duration: 3 });
      });
  };

  renderItems = () => {
    const { searchedItems, searchingItems } = this.props;
    return !searchingItems
      ? searchedItems.map(item => (
          <div className="column is-3" key={item.product_id}>
            <ItemCard addToCart={this._addToCart} item={item} />
          </div>
        ))
      : null;
  };

  renderLoading = () => {
    const { searchingItems } = this.props;
    return searchingItems ? <ItemsLoader /> : null;
  };

  goToPage = page => {
    const { searchKewords, history } = this.props;
    history.push(`/products?page=${page}`);
    this.props._searchProducts({ page, searchKewords });
  };

  render() {
    const {
      match,
      history,
      searchedItemsMeta: { page, pages },
    } = this.props;
    return (
      <Layout match={match} history={history}>
        <div className="container">
          <Pagination goToPage={this.goToPage} page={page} pages={pages} />
          <div className="columns">
            <div className="column is-12 position-relative">
              {this.renderLoading()}
              <div className="columns is-multiline">{this.renderItems()}</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Items.propTypes = {
  searchingItems: propTypes.bool.isRequired,
  searchedItems: propTypes.array.isRequired,
  searchedItemsMeta: propTypes.object.isRequired,
  searchKeywords: propTypes.string.isRequired,
  _addItemToCart: propTypes.func.isRequired,
  _generateCartId: propTypes.func.isRequired,
  _searchProducts: propTypes.func.isRequired,
  _setSearchedItems: propTypes.func.isRequired,
  _setSearchKeywords: propTypes.func.isRequired,
};

export const mapStateToProps = ({
  item: { 
    searchingItems,
    searchKeywords,
    searchedItems,
    searchedItemsMeta,
  },
  cart: {
    cartProductForm: { cart_id: cartId },
  },
}) => ({
  searchingItems,
  cartId,
  searchKeywords,
  searchedItems,
  searchedItemsMeta,
});

export const mapDispatchToProps = dispatch => ({
  _addItemToCart: payload => dispatch(addItemToCart(payload)),
  _generateCartId: () => dispatch(generateCartId()),
  _searchProducts: (payload) => dispatch(searchProducts(payload)),
  _setSearchedItems: (payload) => dispatch(setSearchedItems(payload)),
  _setSearchKeywords: (payload) => dispatch(setSearchKeywords(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Items);
