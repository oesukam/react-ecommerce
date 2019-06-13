import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import HomeShow from './HomeShow';
import './Home.scss';
import HomeSideFilter from './HomeSideFilter';
import { fetchItems } from '../../actions/itemActions';
import ItemCard from '../../components/ItemCard/ItemCard';

export class Home extends Component {
  componentDidMount() {
    const { getItems } = this.props;
    getItems();
  }

  renderItems = () => {
    const { items } = this.props;
    return items.map(item => (
      <div className="column is-4" key={item.product_id}>
        <ItemCard item={item} />
      </div>
    ));
  };

  render() {
    return (
      <Layout>
        <div className="container">
          <HomeShow />
          <div className="columns">
            <div className="column is-3">
              <HomeSideFilter />
            </div>
            <div className="column is-9">
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
};

Home.defaultProps = {
  items: [],
};

export const mapStateToProps = ({ item: { items } }) => ({
  items,
});

export const mapDisptachToProps = dispatch => ({
  getItems: payload => dispatch(fetchItems(payload)),
});

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(Home);
