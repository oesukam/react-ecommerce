import getMetaData from '../../utils/getMetaData';

describe('getMetaData', () => {
  test(`should handle default parameters`, () => {
    expect(getMetaData()).toEqual({ page: 1, pages: 0, total: 0 });
  });

  test(`should return the correct meta data`, () => {
    expect(getMetaData({ count: 50 })).toEqual({ page: 1, pages: 3, total: 50 });
  });
});
