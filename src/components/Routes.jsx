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
import MyCartModal from './MyCartModal/MyCartModal';
import AuthModal from './AuthModal/AuthModal';
import NotFound from '../pages/NotFound/NotFound';
import Settings from '../pages/Settings/Settings';
import OrderModal from './OrderModal/OrderModal';

export const Routes = ({ isAuth, cartModal, authModal, orderModal }) => (
  <Router>
    {authModal ? <AuthModal title={authModal} /> : null}
    {cartModal ? <MyCartModal /> : null}
    {orderModal && isAuth ? <OrderModal /> : null}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/departments/:departmentId" component={Home} />
      <Route exact path="/products/:productId" component={SingleItem} />
      <Route
        exact
        path="/settings"
        render={props =>
          isAuth ? <Settings {...props} /> : <Redirect to="/" />
        }
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool,
  authModal: PropTypes.string,
  cartModal: PropTypes.bool,
  orderModal: PropTypes.string,
};

Routes.defaultProps = {
  isAuth: false,
  authModal: '',
  cartModal: false,
  orderModal: '',
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
