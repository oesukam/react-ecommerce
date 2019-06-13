import React, { Component } from 'react';
import propTypes from 'prop-types';
import Routes from './Routes';
import { connect } from 'react-redux';
import { fetchCategories, fetchDepartments } from '../actions/itemActions';
import './App.scss';

export class App extends Component {
  componentDidMount() {
    const { getCategories, getDepartments } = this.props;
    getCategories();
    getDepartments();
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
  getCategories: () => dispatch(fetchCategories()),
  getDepartments: () => dispatch(fetchDepartments()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
