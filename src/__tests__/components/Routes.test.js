import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Routes, mapStateToProps } from '../../components/Routes';
import initialState from '../../store/initialState';

let store;
const mockStore = configureMockStore([thunk]);

describe('<Routes />', () => {
  test('should render the Routes', () => {
    const routes = shallow(<Routes isAuth />);
    expect(routes).toMatchSnapshot();
  });

  describe('render routes', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    describe('/ - route', () => {
      it('should show Home component for `/`', () => {
        const component = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
              <Routes isAuth />
            </MemoryRouter>
          </Provider>,
        );
        expect(component.find('Home')).toHaveLength(1);
        expect(component.find('Home').props().items).toBeDefined();
        expect(component.find('Home').props().meta).toBeDefined();
      });
    });

    describe('/settings - route', () => {
      it('should show render `/settings`', () => {
        const component = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/settings']}>
              <Routes isAuth={false} />
            </MemoryRouter>
            ,
          </Provider>,
        );
        expect(component.find('Home')).toHaveLength(1);
      });

      it('should show AuthModel for `/settings`', () => {
        const newInitialState = {
          ...initialState,
          currentUser: {
            ...initialState.currentUser,
            isAuth: true
          }
        };
        store = mockStore(newInitialState);
        const component = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/settings']}>
              <Routes isAuth/>
            </MemoryRouter>
            ,
          </Provider>,
        );
        expect(component.find('Settings')).toHaveLength(1);
      });
    });
  });

  describe('reducers', () => {
    test('should return initial props', () => {
      expect(mapStateToProps(initialState)).toEqual({
        isAuth: false,
        cartModal: false,
        authModal: '',
        orderModal: '',
      });
    });
  });
});