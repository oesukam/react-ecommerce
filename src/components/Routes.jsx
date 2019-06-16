import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from '../pages/Home/Home';
import SingleItem from '../pages/SingleItem/SingleItem';
import Login from '../pages/Home/Home';
import MyCart from './MyCart/MyCart';

export const Routes = ({ isAuth, cartModal }) => (
  <Router>
    {cartModal ? <MyCart /> : null}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/departments/:departmentId" component={Home} />
      <Route exact path="/products/:productId" component={SingleItem} />
      <Route
        exact
        path="/login"
        render={props => (!isAuth ? <Login {...props} /> : <Redirect to="/" />)}
      />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool,
};

Routes.defaultProps = {
  isAuth: false,
};

export const mapStateToProps = ({
  currentUser: { isAuth },
  cart: { cartModal },
}) => ({
  isAuth,
  cartModal,
});

export default connect(mapStateToProps)(Routes);
