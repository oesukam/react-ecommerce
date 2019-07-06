
const { API_URL_TEST = 'http://localhost' } = process.env;

describe('axios', () => {
  beforeEach(() => {
    jest.resetModules()
  });
  test(`should have axios baseURL equal ${API_URL_TEST}`, () => {
    const axios =  require('../../utils/axios').default;
    expect(axios.defaults.baseURL).toBe(API_URL_TEST);
  });

  test(`should have axios baseURL not equal ${API_URL_TEST}`, () => {
    process.env.NODE_ENV = 'dev';
    const axios = require('../../utils/axios').default;
    expect(axios.defaults.baseURL).not.toBe(API_URL_TEST);
  });
});
