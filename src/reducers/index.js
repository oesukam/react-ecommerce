import { combineReducers } from 'redux';
import item from './itemReducer';
import currentUser from './currentUserReducer';
import cart from './cartReducer';

const reducers = combineReducers({
  item,
  currentUser,
  cart,
});

export default reducers;
