import React from 'react';
import { shallow } from 'enzyme';
import { HomeSideFilter, mapStateToProps, mapDispatchToProps } from '../../../pages/Home/HomeSideFilter';
import initialState from '../../../store/initialState';

let wrapper;

const props = {
  history: {
    push: jest.fn(),
  },
  meta: {
    page: 1,
    pages: 1,
    total: 10
  },
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
  departmentId: '',
  categoryId: 1,
  loadingItems: false,
  _setCategoryId: jest.fn(),
  _fetchItems: jest.fn(),
}

describe('HomeSideFilter.jsx', () => {
  test('should render HomeSideFilter.jx', () => {
    const newProps = {...props};
    newProps.loadingItems = true;
    wrapper = shallow(
      <HomeSideFilter {...newProps}/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on clear filter', () => {
    test('should clear the filter without departmentId', () => {
      const newProps = {...props};
      newProps.departmentId = '';
      wrapper = shallow(<HomeSideFilter {...newProps} />);

      wrapper.find('.clear-filter-btn').simulate('click');
      expect(newProps._setCategoryId).toHaveBeenCalled();
      expect(newProps._fetchItems).toHaveBeenCalled();
    });

    test('should clear the filter', () => {
      const newProps = {...props};
      newProps.departmentId = 1;
      wrapper = shallow(<HomeSideFilter {...newProps} />);

      wrapper.find('.clear-filter-btn').simulate('click');
      expect(newProps._setCategoryId).toHaveBeenCalled();
      expect(newProps._fetchItems).toHaveBeenCalled();
    });
  });

  describe('when clicking category filter', () => {
    test('should _fetchItems the filter on label clicked without departmentId', () => {
      const newProps = {...props};
      newProps.departmentId = '';
      wrapper = shallow(<HomeSideFilter {...newProps} />);

      wrapper.find('.filter-category-label').at(0).simulate('click');
      expect(newProps._fetchItems).toHaveBeenCalled();
    });

    test('should _fetchItems the filter on label clicked', () => {
      const newProps = {...props};
      newProps.departmentId = 1;
      wrapper = shallow(<HomeSideFilter {...newProps} />);

      wrapper.find('.filter-category-label').at(0).simulate('click');
      expect(newProps._fetchItems).toHaveBeenCalled();
    });
  });

  describe('when category filter input changes', () => {
    test('should _fetchItems the filter on input clicked', () => {
      const newProps = {...props};
      newProps.departmentId = '';
      wrapper = shallow(<HomeSideFilter {...newProps} />);

      wrapper.find('.filter-category-input').at(0).simulate('change');
      expect(newProps._fetchItems).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('categories')
    })
  });

  describe('actions creators', () => {
    test('should dispatch _setCategoryId action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._setCategoryId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch _fetchItems action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch)._fetchItems();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
