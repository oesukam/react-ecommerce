import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../components/App';
import initialState from '../../store/initialState';

let wrapper;
const mockStore = configureMockStore([]);
const store = mockStore(initialState);

describe('App.jsx', () => {
  test('should render App.jx', () => {
    wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
