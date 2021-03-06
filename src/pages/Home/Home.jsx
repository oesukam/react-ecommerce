import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import queryString from 'query-string';
import Notification from 'react-bulma-notification';
import Layout from '../../containers/Layout/Layout';
import HomeShow from './HomeShow';
import './Home.scss';
import HomeSideFilter from './HomeSideFilter';
import {
  fetchItems,
  setCategoryId,
  setDepartmentId,
  addItemToCart,
  setSearchKeywords,
} from '../../actions/itemActions';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import ItemsLoader from '../../components/ContentLoader/ItemsLoader';
import { generateCartId } from '../../actions/cartActions';
import { setOrderModal } from '../../actions/orderActions';

export class Home extends Component {
  componentDidMount() {
    this._loadItems();
    this.props._setOrderModal();
    this.props._setSearchKeywords('');
  }

  componentWillReceiveProps({ match: { params }}) {
    const { match: { params: { departmentId }} } = this.props;
    if (params.departmentId !== departmentId) {
      this._loadItems();
    }
  }

  _loadItems = () => {
    const { location, match: { params: { departmentId }} } = this.props;
    const { category: categoryId, page = 1 } = queryString.parse(
      location.search,
    );
    let type = '';
    if (departmentId) {
      type = 'department';
    }
    if (categoryId) {
      type = 'category';
    }
    this.props._setCategoryId(categoryId || '');
    this.props._setDepartmentId(departmentId || '');
    this.props._fetchItems({ page, categoryId, departmentId, type });
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
    const { items, loadingItems } = this.props;
    return !loadingItems
      ? items.map(item => (
          <div className="column is-4" key={item.product_id}>
            <ItemCard addToCart={this._addToCart} item={item} />
          </div>
        ))
      : null;
  };

  renderLoading = () => {
    const { loadingItems } = this.props;
    return loadingItems ? <ItemsLoader /> : null;
  };

  goToPage = page => {
    const { _fetchItems, categoryId, departmentId, history } = this.props;
    let url = `/?page=${page}`;
    let type;
    if (categoryId) {
      url += `&category=${categoryId}`;
      type = 'category';
    }
    if (departmentId) {
      url = `/departments/${departmentId}${url}`;
      type = 'department';
    }
    history.push(url);
    _fetchItems({ page, categoryId, type });
  };

  render() {
    const {
      match,
      history,
      meta: { page, pages },
      departmentId,
    } = this.props;
    return (
      <Layout match={match} history={history}>
        <div className="container">
          { !departmentId ? <HomeShow /> : null}
          <Pagination goToPage={this.goToPage} page={page} pages={pages} />
          <div className="columns">
            <div className="column is-3">
              <HomeSideFilter history={history} />
            </div>
            <div className="column is-9 position-relative">
              {this.renderLoading()}
              <div className="columns is-multiline">{this.renderItems()}</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  items: propTypes.array.isRequired,
  loadingItems: propTypes.bool.isRequired,
  meta: propTypes.object.isRequired,
  categoryId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  departmentId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  _fetchItems: propTypes.func.isRequired,
  _setCategoryId: propTypes.func.isRequired,
  _addItemToCart: propTypes.func.isRequired,
  _generateCartId: propTypes.func.isRequired,
  _setOrderModal: propTypes.func.isRequired,
  _setSearchKeywords: propTypes.func.isRequired,
  _setDepartmentId: propTypes.func.isRequired,
};

export const mapStateToProps = ({
  item: { 
    items,
    loadingItems,
    categoryId,
    departmentId,
    meta,
  },
  cart: {
    cartProductForm: { cart_id: cartId },
  },
}) => ({
  items,
  loadingItems,
  categoryId,
  departmentId,
  meta,
  cartId,
});

export const mapDispatchToProps = dispatch => ({
  _fetchItems: payload => dispatch(fetchItems(payload)),
  _setCategoryId: payload => dispatch(setCategoryId(payload)),
  _addItemToCart: payload => dispatch(addItemToCart(payload)),
  _generateCartId: () => dispatch(generateCartId()),
  _setOrderModal: () => dispatch(setOrderModal('')),
  _setSearchKeywords: () => dispatch(setSearchKeywords('')),
  _setDepartmentId: payload => dispatch(setDepartmentId(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
