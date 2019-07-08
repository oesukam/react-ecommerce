import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'dotenv/config';

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

const locationMock = {
  reload: jest.fn(),
};

global.location = locationMock
global.localStorage = localStorageMock;
global.Stripe = jest.fn(() => ({
  elements: jest.fn(() => ({
    create: jest.fn(() => ({
      addEventListener: jest.fn((event, cb) => ({ complete: true})),
      mount: jest.fn()
    })),
  })),
}));

