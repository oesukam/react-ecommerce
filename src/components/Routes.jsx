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
import MyCartModal from './MyCartModal/MyCartModal';
import AuthModal from './AuthModal/AuthModal';
import NotFound from '../pages/NotFound/NotFound';

export const Routes = ({ isAuth, cartModal, authModal }) => (
  <Router>
    {authModal && !isAuth ? <AuthModal title={authModal} /> : null}
    {cartModal ? <MyCartModal /> : null}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/departments/:departmentId" component={Home} />
      <Route exact path="/products/:productId" component={SingleItem} />
      <Route
        exact
        path="/login"
        render={props => (!isAuth ? <Login {...props} /> : <Redirect to="/" />)}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool,
  authModal: PropTypes.string,
  cartModal: PropTypes.bool,
};

Routes.defaultProps = {
  isAuth: false,
  authModal: '',
  cartModal: false,
};

export const mapStateToProps = ({
  currentUser: { isAuth, authModal },
  cart: { cartModal },
}) => ({
  isAuth,
  cartModal,
  authModal,
});

export default connect(mapStateToProps)(Routes);
