import { store } from '../../store';

describe('store', () => {
  test('should return the initial store', () => {
    expect(store.getState()._persist.rehydrated).toBeTruthy();
  });
});
