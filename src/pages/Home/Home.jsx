import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import queryString from 'query-string';
import Layout from '../../containers/Layout/Layout';
import HomeShow from './HomeShow';
import './Home.scss';
import HomeSideFilter from './HomeSideFilter';
import { fetchItems, setCategoryId } from '../../actions/itemActions';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import ItemsLoader from '../../components/ContentLoader/ItemsLoader';

export class Home extends Component {
  componentDidMount() {
    const { getItems, location, setCategory } = this.props;
    const { category: categoryId, page = 1 } = queryString.parse(
      location.search,
    );
    let type = '';
    if (categoryId) {
      type = 'category';
    }

    setCategory(categoryId || '');
    getItems({ page, categoryId, type });
  }

  renderItems = () => {
    const { items = [], loadingItems } = this.props;
    return !loadingItems
      ? items.map(item => (
          <div className="column is-4" key={item.product_id}>
            <ItemCard item={item} />
          </div>
        ))
      : null;
  };

  renderLoading = () => {
    const { loadingItems } = this.props;
    return loadingItems ? <ItemsLoader /> : null;
  };

  goToPage = page => {
    const { getItems, categoryId, departmentId, history } = this.props;
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
    getItems({ page, categoryId, type });
  };

  render() {
    const {
      match,
      history,
      meta: { page, pages },
    } = this.props;
    return (
      <Layout match={match} history={history}>
        <div className="container">
          <HomeShow />
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
  items: propTypes.array,
  loadingItems: propTypes.bool,
  meta: propTypes.object,
  categoryId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  departmentId: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

Home.defaultProps = {
  items: [],
  loadingItems: true,
  meta: {
    page: 1,
    pages: 1,
    total: 0,
  },
};

export const mapStateToProps = ({
  item: { items, loadingItems, categoryId, departmentId, meta },
}) => ({
  items,
  loadingItems,
  categoryId,
  departmentId,
  meta,
});

export const mapDisptachToProps = dispatch => ({
  getItems: payload => dispatch(fetchItems(payload)),
  setCategory: payload => dispatch(setCategoryId(payload)),
});

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(Home);
