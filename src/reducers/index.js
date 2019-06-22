import { combineReducers } from 'redux';
import item from './itemReducer';
import currentUser from './currentUserReducer';
import cart from './cartReducer';
import shipping from './shippingReducer';
import order from './orderReducer';

const reducers = combineReducers({
  item,
  currentUser,
  cart,
  shipping,
  order,
});

export default reducers;
