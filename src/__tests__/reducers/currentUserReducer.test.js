import * as types from '../../actions-types/currentUserTypes';
import reducer from '../../reducers/currentUserReducer';
import { currentUser as initialState } from '../../store/initialState';

describe('currentReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.SET_IS_AUTH}`, () => {
    const payload = true;
    const action = {
      type: types.SET_IS_AUTH,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      isAuth: payload,
    });
  });
});
