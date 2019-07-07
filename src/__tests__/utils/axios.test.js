
import { requestHandler, errorHandler }  from '../../utils/axios';

const { API_URL_TEST = 'http://localhost' } = process.env;

describe('axios', () => {
  describe('interceptors handler', () => {
    test('requestHandler', () => {
      const userKey = 'user-key'
      const request = {
        headers: {}
      }
      expect(requestHandler(request).headers[userKey]).toBe(userKey)
    });

    test('errorHandler', () => {
      const err = 'JsonWebTokenError: jwt malformed';
      const error = {
        response: {
          data: { error: err}
        }
      }
      errorHandler(error).catch(catchErr => {
        expect(catchErr.response.data.error).toBe(err)
      })
    });
  });

  describe('default config', () => {
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
  })
});
