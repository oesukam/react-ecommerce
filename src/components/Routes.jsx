import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Home from '../pages/Home/Home';
import SingleItem from '../pages/SingleItem/SingleItem';
import NotFound from '../pages/NotFound/NotFound';
import Settings from '../pages/Settings/Settings';
import Items from '../pages/Items/Items';


export const Routes = ({ isAuth }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/departments/:departmentId" component={Home} />
    <Route exact path="/products/:productId" component={SingleItem} />
    <Route exact path="/products" component={Items} />
    <Route
      exact
      path="/settings"
      render={props =>
        isAuth ? <Settings {...props} /> : <Redirect to="/" />
      }
    />
    <Route path="*" component={NotFound} />
  </Switch>
);

Routes.propTypes = {
  isAuth: propTypes.bool.isRequired,
};

export const mapStateToProps = ({
  currentUser: { isAuth, authModal },
  cart: { cartModal },
  order: { orderModal },
}) => ({
  isAuth,
  cartModal,
  authModal,
  orderModal,
});

export default connect(mapStateToProps)(Routes);
