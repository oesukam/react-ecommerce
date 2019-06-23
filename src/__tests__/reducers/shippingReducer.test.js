import * as types from '../../actions-types/shippingActionsTypes';
import reducer from '../../reducers/shippingReducer';
import {
  shipping as initialState
} from '../../store/initialState';

describe('shippingReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.SET_LOADING_SHIPPING_REGION}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_SHIPPING_REGION,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingRegion: payload,
    });
  });

  test(`should handle ${types.SET_LOADING_SHIPPING_REGIONS}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_SHIPPING_REGIONS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingRegions: payload,
    });
  });

  test(`should handle ${types.SET_SHIPPING_REGION}`, () => {
    const payload = {};
    const action = {
      type: types.SET_SHIPPING_REGION,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      region: payload,
    });
  });

  test(`should handle ${types.SET_SHIPPING_REGIONS}`, () => {
    const payload = {};
    const action = {
      type: types.SET_SHIPPING_REGIONS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      regions: payload,
    });
  });
});