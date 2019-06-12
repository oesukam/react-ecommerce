import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

it('should render without crashing', () => {
  shallow(<App />);
});
