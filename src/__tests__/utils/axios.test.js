import axios from '../../helpers/axios';

describe('axios', () => {
  test('should return axios instance', () => {
    expect(axios).toBeDefined();
  });
});
