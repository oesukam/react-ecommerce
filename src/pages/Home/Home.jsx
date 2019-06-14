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

export class Home extends Component {
  componentDidMount() {
    const { getItems, location, setCategory } = this.props;
    const { category: categoryId, page = 1 } = queryString.parse(
      location.search,
    );

    console.log('===', categoryId);
    setCategory(categoryId);

    getItems({ page, categoryId });
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
    return loadingItems ? (
      <div className="loading-container">
        <div className="loading center" />
      </div>
    ) : null;
  };

  render() {
    const { match } = this.props;
    return (
      <Layout match={match}>
        <div className="container">
          <HomeShow />
          <div className="columns">
            <div className="column is-3">
              <HomeSideFilter />
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
};

Home.defaultProps = {
  items: [],
  loadingItems: true,
};

export const mapStateToProps = ({ item: { items, loadingItems } }) => ({
  items,
  loadingItems,
});

export const mapDisptachToProps = dispatch => ({
  getItems: payload => dispatch(fetchItems(payload)),
  setCategory: payload => dispatch(setCategoryId(payload)),
});

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(Home);
