import { combineReducers } from 'redux';
import item from './itemReducer';
import currentUser from './currentUserReducer';

const reducers = combineReducers({
  item,
  currentUser,
});

export default reducers;
