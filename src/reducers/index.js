import { combineReducers } from 'redux';
import item from './itemReducer';
import currentUser from './currentUserReducer';
import cart from './cartReducer';
import shipping from './shippingReducer';

const reducers = combineReducers({
  item,
  currentUser,
  cart,
  shipping,
});

export default reducers;
