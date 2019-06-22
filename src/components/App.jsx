import React, { Component } from 'react';
import propTypes from 'prop-types';
import Routes from './Routes';
import { connect } from 'react-redux';
import { fetchCategories, fetchDepartments } from '../actions/itemActions';
import { fetchShippingRegions } from '../actions/shippingActions';
import { fetchCurrentUser } from '../actions/currentUserActions';
import './App.scss';
import { fetchAllTax, fetchOrders } from '../actions/orderActions';

export class App extends Component {
  componentDidMount() {
    this.props._fetchCategories();
    this.props._fetchDepartments();
    this.props._fetchCurrentUser();
    this.props._fetchAllTax();
    this.props._fetchShippingRegions();
    this.props._fetchOrders();
  }
  render() {
    return <Routes />;
  }
}

App.propTypes = {
  getCategories: propTypes.func,
  getDepartments: propTypes.func,
};

export const mapDispatchToProps = dispatch => ({
  _fetchCategories: () => dispatch(fetchCategories()),
  _fetchDepartments: () => dispatch(fetchDepartments()),
  _fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  _fetchAllTax: () => dispatch(fetchAllTax()),
  _fetchShippingRegions: () => dispatch(fetchShippingRegions()),
  _fetchOrders: () => dispatch(fetchOrders()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
