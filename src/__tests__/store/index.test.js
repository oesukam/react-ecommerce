import store from '../../store';
import initialState from '../../store/initialState';

describe('store', () => {
  test('should return the initial store', () => {
    expect(store.getState()).toEqual(initialState);
  });
});
