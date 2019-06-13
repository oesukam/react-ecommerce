import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
