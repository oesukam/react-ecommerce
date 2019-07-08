import React from 'react';
import { shallow } from 'enzyme';
import { HomeShow, mapStateToProps } from '../../../pages/Home/HomeShow';
import initialState from '../../../store/initialState';

let wrapper;

const props = {
  categories: [
    {
      department_id: 2,
      category_id: 1,
      name: 'category 1'
    },
    {
      department_id: 1,
      category_id: 2,
      name: 'category 2'
    }
  ],
  departments: [
    {
      department_id: 1,
      name: 'department 1'
    },
    {
      department_id: 2,
      name: 'department 2'
    }
  ],
}

window.location.search = '';

describe('HomeShow.jsx', () => {
  test('should render HomeShow.jx', () => {
    wrapper = shallow(
      <HomeShow {...props}/>
    );
    expect(wrapper).toMatchSnapshot();
  });



  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('categories')
      expect(mapStateToProps(initialState)).toHaveProperty('departments')
    })
  });
});
