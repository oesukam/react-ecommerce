import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';

export class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="bg-red">
          <h1>Home</h1>
          <h2>Home</h2>
          <h3>Home</h3>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  allItems: propTypes.array,
};

Home.defaultProps = {
  allItems: [],
};

export const mapStateToProps = ({ item: { allItems } }) => ({
  allItems,
});

export default connect(mapStateToProps)(Home);
