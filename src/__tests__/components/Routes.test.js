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
    const routes = shallow(<Routes />);
    expect(routes).toMatchSnapshot();
  });

  test('should render modals', () => {
    const props = {
      isAuth: true,
      cartModal: true,
      authModal: 'Sign In',
      orderModal: 'Delivery',
    };
    const wrapper = shallow(<Routes {...props} />);
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
  
      it('should show redirect to `/` for `/auth`', () => {
        const component = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/auth']}>
              <Routes isAuth />
            </MemoryRouter>
          </Provider>,
        );
        expect(component.find('Home')).toHaveLength(1);
      });
    });
    describe('/settings - route', () => {
      it('should show AuthModel for `/settings`', () => {
        const component = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/settings']}>
              <Routes />
            </MemoryRouter>
            ,
          </Provider>,
        );
        expect(component.find('Home')).toHaveLength(1);
      });

      // it('should show render `/settings`', () => {
      //   const component = mount(
      //     <Provider store={store}>
      //       <MemoryRouter initialEntries={['/settings']}>
      //         <Routes isAuth />
      //       </MemoryRouter>
      //       ,
      //     </Provider>,
      //   );
      //   expect(component.find('Settings')).toHaveLength(1);
      // });
    });
  });

  describe('reducers', () => {
    test('should return initial props', () => {
      expect(mapStateToProps(initialState)).toEqual({
        isAuth: false,
        cartModal: false,
        authModal: '',
        orderModal: false,
      });
    });
  });
});